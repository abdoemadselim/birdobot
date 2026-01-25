import { Mail } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="flex flex-1 flex-col bg-brand-25 items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="flex justify-center mb-6">
                        <div className="bg-brand-100 rounded-full p-4">
                            <Mail className="w-8 h-8 text-brand-700" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                        Need Help?
                    </h1>

                    <p className="text-gray-600 mb-6">
                        We're here to help! For any questions or support inquiries, please reach out to us at:
                    </p>

                    <a
                        href="mailto:support@birdobot.site"
                        className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors duration-200"
                    >
                        support@birdobot.site
                    </a>

                    <p className="text-sm text-gray-500 mt-6">
                        We typically respond within 24 hours
                    </p>
                </div>
            </div>
        </div>
    );
}