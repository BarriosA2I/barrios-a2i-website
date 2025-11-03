'use server';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: {
  email: string;
  company: string;
  agentCount: string;
  message: string;
}) {
  try {
    // Validate data
    if (!formData.email || !formData.message) {
      return { success: false, error: 'Email and message required' };
    }

    // 1. Store in Supabase
    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          email: formData.email,
          company: formData.company,
          agent_count: formData.agentCount ? parseInt(formData.agentCount) : null,
          message: formData.message,
          status: 'new',
        },
      ])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return { success: false, error: 'Failed to save submission' };
    }

    // 2. Send email to ADMIN
    try {
      const adminEmailResult = await resend.emails.send({
        from: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.ADMIN_EMAIL || 'alienation2innovation@gmail.com',
        subject: `🚀 New Contact Form Submission from ${formData.company || formData.email}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00D9FF 0%, #FFA726 100%); color: white; padding: 20px; border-radius: 8px; }
                .content { background: #f5f5f5; padding: 20px; margin-top: 20px; border-radius: 8px; }
                .field { margin: 15px 0; }
                .field-label { font-weight: bold; color: #00D9FF; }
                .field-value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00D9FF; }
                .cta { display: inline-block; background: #00D9FF; color: #0B1220; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold; }
                .footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎯 New Lead Submitted!</h2>
                  <p>Someone is interested in Barrios A2I</p>
                </div>

                <div class="content">
                  <div class="field">
                    <div class="field-label">📧 Email:</div>
                    <div class="field-value">${formData.email}</div>
                  </div>

                  <div class="field">
                    <div class="field-label">🏢 Company:</div>
                    <div class="field-value">${formData.company || 'Not provided'}</div>
                  </div>

                  <div class="field">
                    <div class="field-label">🤖 Current Agent Count:</div>
                    <div class="field-value">${formData.agentCount || 'Not specified'}</div>
                  </div>

                  <div class="field">
                    <div class="field-label">💬 Message:</div>
                    <div class="field-value">${formData.message}</div>
                  </div>

                  <div class="field">
                    <div class="field-label">⏰ Submitted:</div>
                    <div class="field-value">${new Date().toLocaleString()}</div>
                  </div>

                  <a href="https://vdzvywmmtjvdxscwjppp.supabase.co/project/_/editor" class="cta">View in Supabase</a>
                </div>

                <div class="footer">
                  <p>Barrios A2I Contact Form Notification</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log('✅ Admin email sent:', adminEmailResult);
    } catch (emailError) {
      console.error('❌ Failed to send admin email:', emailError);
      // Don't fail the whole operation if email fails
    }

    // 3. Send CONFIRMATION email to USER
    try {
      const userEmailResult = await resend.emails.send({
        from: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: formData.email,
        subject: '✅ We Received Your Message - Barrios A2I',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00D9FF 0%, #FFA726 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
                .content { background: #f5f5f5; padding: 20px; margin-top: 20px; border-radius: 8px; }
                .highlight { color: #00D9FF; font-weight: bold; }
                .next-steps { background: white; padding: 15px; border-left: 4px solid #00D9FF; margin: 15px 0; }
                .footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎉 Thank You!</h2>
                  <p>We've received your message</p>
                </div>

                <div class="content">
                  <p>Hi ${formData.company || 'there'},</p>

                  <p>Thank you for reaching out to <span class="highlight">Barrios A2I</span>. We're excited to learn about your multi-agent orchestration needs!</p>

                  <div class="next-steps">
                    <strong>What happens next:</strong>
                    <ul>
                      <li>Our team will review your submission</li>
                      <li>We'll schedule your 30-minute technical consultation</li>
                      <li>Expected response: <span class="highlight">Within 24 hours</span></li>
                    </ul>
                  </div>

                  <p><strong>In the meantime:</strong></p>
                  <ul>
                    <li>📖 Check out our <a href="https://docs.barriosa2i.com">documentation</a></li>
                    <li>🎥 Watch our <a href="https://www.youtube.com">demo video</a></li>
                    <li>📊 Review our <a href="http://localhost:3001">architecture overview</a></li>
                  </ul>

                  <p>Questions? Reply to this email anytime.</p>

                  <p>Best regards,<br/>
                  <strong>Barrios A2I Team</strong><br/>
                  <span class="highlight">Orchestrating Intelligence at Scale</span>
                  </p>
                </div>

                <div class="footer">
                  <p>© 2025 Barrios A2I. All rights reserved.</p>
                  <p><a href="http://localhost:3001">Visit our website</a> | <a href="mailto:alienation2innovation@gmail.com">Contact us</a></p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log('✅ User confirmation email sent:', userEmailResult);
    } catch (emailError) {
      console.error('❌ Failed to send user confirmation email:', emailError);
      // Don't fail the whole operation if email fails
    }

    return {
      success: true,
      message: "Thank you! We've received your submission and sent a confirmation email.",
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: 'An error occurred. Please try again or contact us directly.',
    };
  }
}
