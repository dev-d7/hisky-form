import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function emailHTML(d: {
  name: string; email: string; mobile: string; address: string
  requirements: string; refId: string
  now: string; fileCount: number
}) {
  const req = d.requirements.replace(/\n/g, '<br>')
  const filesRow = d.fileCount > 0
    ? `<tr><td colspan="2" style="padding:14px 32px;background:#f0f7e6;border-top:2px dashed rgba(109,179,63,.2);">
         <span style="font-size:13px;color:#4a8f25;">📎 ${d.fileCount} attachment${d.fileCount > 1 ? 's' : ''} included with this email</span>
       </td></tr>`
    : ''

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1B2B5E,#243570);padding:32px;text-align:center;border-radius:16px 16px 0 0;">
    <div style="font-size:30px;font-weight:900;color:#6DB33F;letter-spacing:3px;margin-bottom:4px;">HI SKY GROUP</div>
    <div style="color:rgba(255,255,255,0.45);font-size:13px;">Let's fly &nbsp;·&nbsp; Solar EPC Solutions</div>
  </td></tr>

  <!-- Alert banner -->
  <tr><td style="background:#6DB33F;padding:14px 32px;">
    <div style="color:white;font-size:17px;font-weight:700;">⚡ New Solar Project Inquiry</div>
  </td></tr>

  <!-- Ref id -->
  <tr><td style="background:#1B2B5E;padding:10px 32px;text-align:right;">
    <span style="color:rgba(255,255,255,0.45);font-size:12px;">Reference ID: </span>
    <span style="color:#6DB33F;font-weight:700;font-size:12px;">${d.refId}</span>
  </td></tr>

  <!-- Client info -->
  <tr><td style="background:#ffffff;padding:28px 32px;">
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#6DB33F;margin-bottom:16px;">🏢 Client Information</div>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[
        ['Name',          `<strong>${d.name}</strong>`],
        ['Company',       `<strong>${d.address}</strong>`],
        ['Email',         `<a href="mailto:${d.email}" style="color:#1B2B5E;font-weight:600;">${d.email}</a>`],
        ['Mobile',        `<a href="tel:+91${d.mobile}" style="color:#1B2B5E;font-weight:600;">+91 ${d.mobile}</a>`],
      ].map(([label, val], i, arr) => `
      <tr>
        <td style="padding:11px 0;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}width:38%;">
          <span style="font-size:13px;color:#94a3b8;font-weight:600;">${label}</span>
        </td>
        <td style="padding:11px 0;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">
          <span style="font-size:14px;color:#1e293b;">${val}</span>
        </td>
      </tr>`).join('')}
    </table>
  </td></tr>

  <!-- Requirements -->
  <tr><td style="background:#f8fafc;padding:28px 32px;">
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#6DB33F;margin-bottom:14px;">📋 Project Requirements</div>
    <div style="background:white;border:1px solid #e2e8f0;border-left:4px solid #6DB33F;border-radius:10px;padding:18px 20px;font-size:14px;color:#334155;line-height:1.85;">
      ${req}
    </div>
  </td></tr>

  <!-- Attachments row -->
  ${filesRow}

  <!-- Meta row -->
  <tr><td style="background:#f8fafc;padding:12px 32px;border-top:1px solid #e2e8f0;">
    <table width="100%"><tr>
      <td style="font-size:12px;color:#94a3b8;">🕐 ${d.now} IST</td>
      <td style="font-size:12px;color:#94a3b8;text-align:right;">🌐 Hi Sky Group Client Portal</td>
    </tr></table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:white;padding:24px 32px;text-align:center;border-top:1px solid #f1f5f9;">
    <a href="mailto:${d.email}" style="display:inline-block;background:linear-gradient(135deg,#6DB33F,#4a8f25);color:white;font-weight:700;font-size:14px;padding:13px 30px;border-radius:9px;text-decoration:none;">
      Reply to ${d.name} →
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#1B2B5E;padding:24px 32px;text-align:center;border-radius:0 0 16px 16px;">
    <div style="color:white;font-weight:700;font-size:15px;margin-bottom:8px;">Hi Sky Group</div>
    <div style="color:rgba(255,255,255,0.45);font-size:12px;line-height:1.9;">
      A-1508, ATS BOUQUET, Sector 132, Noida – UP 201304<br>
      📞 +91 96251 90691 &nbsp;|&nbsp; 📧 purchase@hiskygroup.com &nbsp;|&nbsp; 🌐 www.hiskygroup.com
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const fd   = await req.formData()
    const get  = (k: string) => (fd.get(k) as string | null) ?? ''

    const name         = get('name')
    const email        = get('email')
    const mobile       = get('mobile')
    const address      = get('address')
    const requirements = get('requirements')

    const fileItems  = fd.getAll('files') as File[]
    const attachments = await Promise.all(
      fileItems.map(async (f) => ({
        filename:    f.name,
        content:     Buffer.from(await f.arrayBuffer()),
        contentType: f.type || 'application/octet-stream',
      }))
    )

    const transporter = nodemailer.createTransport({
      host:   'smtp.gmail.com',
      port:   465,
      secure: true,        // port 465 = SSL, works on Vercel serverless
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const refId = `HSG-${Date.now().toString(36).toUpperCase()}`
    const now   = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata', day: '2-digit', month: 'long',
      year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    })

    await transporter.sendMail({
      from:       `"Hi Sky Group Portal" <${process.env.SMTP_USER}>`,
      to:          process.env.EMAIL_TO ?? 'devansh@nexttoppers.com',
      replyTo:     email,
      subject:    `⚡ New Solar Inquiry – ${name} | Hi Sky Group`,
      html:        emailHTML({ name, email, mobile, address, requirements, refId, now, fileCount: fileItems.length }),
      attachments,
    })

    return NextResponse.json({ success: true, refId })
  } catch (err) {
    console.error('[submit]', err)
    return NextResponse.json({ error: 'Failed to send email. Check server logs.' }, { status: 500 })
  }
}
