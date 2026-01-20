import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            <div className="max-w-4xl mx-auto px-6 py-12">

                <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="w-8 h-8 text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                    </div>

                    <p className="text-sm text-gray-500 mb-8">Last updated: January 20, 2026</p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                            <p>By accessing and using BirdoBot, you accept and agree to be bound by these Terms of Service. If you don't agree to these terms, please don't use our service.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                            <p>BirdoBot provides real-time event notification services that deliver alerts to Discord, Slack, and Telegram. We offer both free and paid plans with different usage limits.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
                            <p>You are responsible for:</p>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>Maintaining the security of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Usage Limits</h2>
                            <p>Each plan has specific limits on events and categories. Exceeding these limits may result in service interruption. Upgrade your plan to increase limits.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Payment Terms</h2>
                            <p>Paid plans are billed as one-time payments. All payments are processed securely through Paddle.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Acceptable Use</h2>
                            <p>You agree not to:</p>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>Use the service for any illegal purposes</li>
                                <li>Send spam or malicious content through our notifications</li>
                                <li>Attempt to disrupt or compromise our service</li>
                                <li>Share your API keys with unauthorized parties</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h2>
                            <p>We reserve the right to suspend or terminate your account if you violate these terms.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
                            <p>We may update these terms occasionally. We'll notify you of significant changes via email or through the service.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
                            <p>Questions about these terms? Contact us at support@birdobot.site</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
