import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-brand-25 flex flex-col items-center justify-center px-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <svg
                    width="768"
                    height="736"
                    viewBox="0 0 768 736"
                    fill="none"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <mask
                        id="mask0"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="-32"
                        width="768"
                        height="768"
                    >
                        <rect
                            width="768"
                            height="768"
                            transform="translate(0 -32)"
                            fill="url(#paint0_radial)"
                        />
                    </mask>
                    <g mask="url(#mask0)">
                        <g clipPath="url(#clip0)">
                            <line x1="0.5" y1="-32" x2="0.5" y2="736" stroke="#E4E7EC" />
                            <line x1="48.5" y1="-32" x2="48.5" y2="736" stroke="#E4E7EC" />
                            <line x1="96.5" y1="-32" x2="96.5" y2="736" stroke="#E4E7EC" />
                            <line x1="144.5" y1="-32" x2="144.5" y2="736" stroke="#E4E7EC" />
                            <line x1="192.5" y1="-32" x2="192.5" y2="736" stroke="#E4E7EC" />
                            <line x1="240.5" y1="-32" x2="240.5" y2="736" stroke="#E4E7EC" />
                            <line x1="288.5" y1="-32" x2="288.5" y2="736" stroke="#E4E7EC" />
                            <line x1="336.5" y1="-32" x2="336.5" y2="736" stroke="#E4E7EC" />
                            <line x1="384.5" y1="-32" x2="384.5" y2="736" stroke="#E4E7EC" />
                            <line x1="432.5" y1="-32" x2="432.5" y2="736" stroke="#E4E7EC" />
                            <line x1="480.5" y1="-32" x2="480.5" y2="736" stroke="#E4E7EC" />
                            <line x1="528.5" y1="-32" x2="528.5" y2="736" stroke="#E4E7EC" />
                            <line x1="576.5" y1="-32" x2="576.5" y2="736" stroke="#E4E7EC" />
                            <line x1="624.5" y1="-32" x2="624.5" y2="736" stroke="#E4E7EC" />
                            <line x1="672.5" y1="-32" x2="672.5" y2="736" stroke="#E4E7EC" />
                            <line x1="720.5" y1="-32" x2="720.5" y2="736" stroke="#E4E7EC" />
                        </g>
                    </g>
                    <defs>
                        <radialGradient
                            id="paint0_radial"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(384 384) rotate(90) scale(384 384)"
                        >
                            <stop />
                            <stop offset="1" stopOpacity="0" />
                        </radialGradient>
                        <clipPath id="clip0">
                            <rect
                                width="768"
                                height="768"
                                fill="white"
                                transform="translate(0 -32)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* 404 Text */}
                <div className="mb-6">
                    <h1 className="text-8xl sm:text-9xl font-bold text-brand-700 mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Oops! The page you're looking for seems to have flown away.
                        Let's get you back on track.
                    </p>
                </div>

                {/* Bird Illustration */}
                <div className="mt-12 flex justify-center">
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-bounce"
                    >
                        <circle cx="100" cy="100" r="80" fill="#F7F6FF" />
                        <path
                            d="M100 60C88 60 78 70 78 82C78 94 88 104 100 104C112 104 122 94 122 82C122 70 112 60 100 60Z"
                            fill="#4A3DFF"
                        />
                        <circle cx="90" cy="80" r="8" fill="white" />
                        <circle cx="110" cy="80" r="8" fill="white" />
                        <circle cx="92" cy="78" r="4" fill="#2C229E" />
                        <circle cx="112" cy="78" r="4" fill="#2C229E" />
                        <path
                            d="M85 95C85 95 92.5 100 100 100C107.5 100 115 95 115 95"
                            stroke="#2C229E"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M70 90L50 85L55 95Z"
                            fill="#FFA07A"
                        />
                        <path
                            d="M130 90L150 85L145 95Z"
                            fill="#FFA07A"
                        />
                    </svg>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors duration-200 shadow-lg hover:shadow-xl group"
                    >
                        <Home className="size-5" />
                        Go Home
                    </Link>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-lg font-medium border-2 border-brand-700 hover:bg-brand-50 transition-colors duration-200 group"
                    >
                        Go to Dashboard
                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
        </div>
    );
}