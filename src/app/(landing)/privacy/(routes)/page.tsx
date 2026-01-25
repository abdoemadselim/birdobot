import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-8 h-8 text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                    </div>

                    <p className="text-sm text-gray-500 mb-8">Last updated: January 20, 2026</p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                            <p className="mb-2">We collect the following information:</p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li><strong>Account Information:</strong> Email address, name</li>
                                <li><strong>Integration IDs:</strong> Discord, Slack, and Telegram channel/chat IDs</li>
                                <li><strong>Event Data:</strong> Event categories, custom fields, and notification content you send</li>
                                <li><strong>Usage Data:</strong> API usage, event counts, and service interaction logs</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                            <p>We use your information to:</p>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>Deliver notification services to your chosen platforms</li>
                                <li>Manage your account and provide customer support</li>
                                <li>Process payments and prevent fraud</li>
                                <li>Improve our service and develop new features</li>
                                <li>Send important service updates and announcements</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Storage and Security</h2>
                            <p>Your data is stored securely using industry-standard encryption.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Sharing</h2>
                            <p>We don't sell your personal information. We only share data with:</p>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>Third-party platforms you've connected (Discord, Slack, Telegram)</li>
                                <li>Service providers necessary to operate BirdoBot</li>
                                <li>Law enforcement when required by law</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>Access your personal data</li>
                                <li>Request data deletion</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies and Tracking</h2>
                            <p>We use essential cookies for authentication and service functionality. We don't use tracking cookies for advertising purposes.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to Privacy Policy</h2>
                            <p>We may update this policy periodically. We'll notify you of significant changes via email.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
                            <p>Questions about privacy? Email us at support@birdobot.site</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
