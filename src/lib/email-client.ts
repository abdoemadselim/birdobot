import { Resend } from "resend"

interface EventNotificationData {
  categoryName: string
  categoryEmoji: string
  categoryColor: number
  fields: Record<string, string | number>
  timestamp: Date
  description?: string
}

export class EmailClient {
  private resend: Resend

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey)
  }

  /**
   * Escape HTML to prevent XSS attacks
   */
  private escapeHtml(text: string | number): string {
    const str = String(text)
    const htmlEscapes: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    }
    return str.replace(/[&<>"'/]/g, (char) => htmlEscapes[char] || char)
  }

  /**
   * Convert hex color number to CSS hex string
   */
  private colorToHex(color: number): string {
    return `#${color.toString(16).padStart(6, "0")}`
  }

  /**
   * Generate HTML email template
   */
  private generateEmailHtml(data: EventNotificationData): string {
    const { categoryName, categoryEmoji, categoryColor, fields, timestamp, description } = data
    const accentColor = this.colorToHex(categoryColor)
    const fieldsHtml = Object.entries(fields)
      .map(
        ([key, value]) => `
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">
            ${this.escapeHtml(key)}
          </td>
          <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">
            ${this.escapeHtml(value)}
          </td>
        </tr>
      `
      )
      .join("")

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Notification: ${this.escapeHtml(categoryName)}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);">
          <!-- Header with accent color -->
          <tr>
            <td style="padding: 0;">
              <div style="height: 4px; background-color: ${accentColor}; border-radius: 8px 8px 0 0;"></div>
            </td>
          </tr>

          <!-- Category header -->
          <tr>
            <td style="padding: 24px 24px 16px 24px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <span style="font-size: 32px; line-height: 1;">${this.escapeHtml(categoryEmoji)}</span>
                  </td>
                  <td style="padding-left: 12px; vertical-align: middle;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827;">
                      ${this.escapeHtml(categoryName)}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            description
              ? `
          <!-- Description -->
          <tr>
            <td style="padding: 0 24px 16px 24px;">
              <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                ${this.escapeHtml(description)}
              </p>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Event fields -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                ${fieldsHtml}
              </table>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                ${timestamp.toLocaleString("en-US", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
                Sent by <strong>BirdoBot</strong> Event Notifications
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()
  }

  /**
   * Generate plain text email fallback
   */
  private generateEmailText(data: EventNotificationData): string {
    const { categoryName, categoryEmoji, fields, timestamp, description } = data
    const fieldsText = Object.entries(fields)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")

    return `
${categoryEmoji} ${categoryName}

${description ? `${description}\n\n` : ""}Event Details:
${fieldsText}

Sent: ${timestamp.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    })}

---
Sent by BirdoBot Event Notifications
    `.trim()
  }

  /**
   * Send event notification email
   */
  async sendEventNotification(
    to: string,
    data: EventNotificationData
  ): Promise<void> {
    const html = this.generateEmailHtml(data)
    const text = this.generateEmailText(data)

    await this.resend.emails.send({
      from: "BirdoBot <notifications@birdobot.app>",
      to,
      subject: `${data.categoryEmoji} ${data.categoryName} Event`,
      html,
      text,
    })
  }
}
