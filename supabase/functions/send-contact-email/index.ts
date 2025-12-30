Deno.serve(async (req) => {
  const origin = req.headers.get('origin') ?? '*'
  const corsHeaders = {
    'access-control-allow-origin': origin,
    'access-control-allow-headers': 'authorization, x-client-info, apikey, content-type',
    'access-control-allow-methods': 'POST, OPTIONS',
    'content-type': 'application/json; charset=utf-8',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  const record = body as Record<string, unknown>
  const name = typeof record.name === 'string' ? record.name.trim().replace(/\s+/g, ' ') : ''
  const emailRaw = typeof record.email === 'string' ? record.email : ''
  const email = emailRaw
    .trim()
    .replaceAll('\u00A0', '')
    .replaceAll('\u200B', '')
    .replaceAll('\u200C', '')
    .replaceAll('\u200D', '')
    .replaceAll('\uFEFF', '')
    .toLowerCase()
  const message = typeof record.message === 'string' ? record.message.trim() : ''

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  if (name.length < 2 || name.length > 80) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid name' }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  if (email.length > 254 || /\s/.test(email) || !email.includes('@')) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  if (message.length < 10 || message.length > 2000) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid message' }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? ''
  const toEmail = Deno.env.get('CONTACT_TO_EMAIL') ?? ''
  const fromEmail = Deno.env.get('CONTACT_FROM_EMAIL') ?? 'onboarding@resend.dev'
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)

  if (allowedOrigins.length > 0 && origin !== '*' && !allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ ok: false, error: 'Origin not allowed' }), {
      status: 403,
      headers: { ...corsHeaders, 'access-control-allow-origin': allowedOrigins[0] ?? origin },
    })
  }

  if (!resendApiKey || !toEmail) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing server configuration' }), {
      status: 500,
      headers: corsHeaders,
    })
  }

  const subject = `Nuevo mensaje de contacto: ${name}`
  const text = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}\n`
  const html = `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(
    email,
  )}</p><p><strong>Mensaje:</strong></p><pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>`

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text,
      html,
      reply_to: email,
    }),
  })

  if (!resendResponse.ok) {
    return new Response(JSON.stringify({ ok: false, error: 'Email provider error' }), {
      status: 502,
      headers: corsHeaders,
    })
  }

  return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
})

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

