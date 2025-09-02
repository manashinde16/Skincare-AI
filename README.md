# Skincare-AI 🌟

An AI-powered platform that analyzes your skin through images, understands your concerns through voice input, and provides a personalized skincare routine — just like a dermatologist would.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-93%25-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-4.8%25-yellow)
![CSS](https://img.shields.io/badge/CSS-2.2%25-purple)

## 🧠 Objective

To create an intelligent, easy-to-use skincare assistant that mimics the diagnostic process of a dermatologist by analyzing facial images, interpreting voice-based concerns, and offering science-based skincare recommendations.

## 🎯 Use Case

Millions of people struggle with skin issues such as acne, dark spots, oily skin, or pigmentation but lack access to personalized and affordable dermatological advice. This platform empowers users with:

- Non-invasive, AI-driven skin analysis
- Voice-to-text support for easy communication
- Structured, daily skincare routines
- Product recommendations backed by AI and dermatological logic
- A clean, ad-free, wellness-first experience

No login is required. Users can simply upload images, answer a few skin-related questions, optionally record a voice description, and receive a full personalized care plan instantly.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun
- Modern web browser with camera access
- Microphone (for voice input features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manashinde16/Skincare-AI.git
cd Skincare-AI
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Overview

The platform focuses on **face-only skin analysis** (initial phase), where users upload three images — left profile, right profile, and front view. They are also asked relevant questions like:

- Do you have oily or dry skin?
- Any history of acne, pigmentation, or allergies?
- Any medications or treatments previously taken?

A short voice input lets users describe anything they feel is missing. This is then processed by a large language model (LLM), combined with visual analysis from AI models, and used to:

- Understand the user's skin condition
- Identify patterns like acne severity, dryness, oil zones, pigmentation
- Suggest a **morning and night skincare routine**
- Recommend **specific products**, including cleansers, moisturizers, sunscreens, and treatments

## 🛠️ Technology Stack

- **Frontend**: Next.js, TypeScript, React.js
- **Styling**: CSS/SCSS
- **AI/ML**: TensorFlow.js for image analysis
- **Voice Processing**: Web Speech API
- **Language Models**: Integration with advanced LLMs

## 📌 Why This Project?

- **Accessible Skincare**: Most users don't have the time or resources to visit a dermatologist. This app acts as a smart helper, not a doctor, guiding users toward better skin health.
- **Personalized Guidance**: Unlike typical product recommendation engines, this project delivers dermatologically inspired, time-specific routines (e.g., morning/night), not just random products.
- **Voice-first Experience**: Designed for convenience, especially for users who may not want to type long descriptions.
- **Scalable & Ethical Monetization**: Affiliate links and sponsored placements from skincare brands support a free model without compromising user trust.

## 🔮 Future Scope

- Extend support to body skincare
- Support for skin condition tracking over time
- Real-time chat with dermatologists (teledermatology)
- Localization in multiple Indian languages
- AI-powered weekly follow-up routines or reminders

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> 🚫 **Disclaimer**: This platform is not a medical diagnostic tool. It is meant to assist users in understanding and managing general skincare concerns.

Made with ❤️ for better skin health
