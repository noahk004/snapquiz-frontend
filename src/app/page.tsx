import Link from "next/link";
import {
  ArrowRight,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroAnimation from "@/components/hero-animation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 ms-1">
            SnapQuiz
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {/* <Link
            href="#features"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Features
          </Link> */}
          <Link
            href="#how-it-works"
            className="text-slate-300 hover:text-white transition-colors"
          >
            How It Works
          </Link>
          {/* <Link
            href="#pricing"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Pricing
          </Link> */}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <Link href="/login">Log In</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 cursor-pointer"
          >
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 relative">
        {/* <Badge className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-purple-900/50 text-purple-300 border-purple-700 mb-4">
          New: AI-powered question generation
        </Badge> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block">Transform</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                Learning Materials
              </span>
              <span className="block">into Exams</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg">
              Upload your learning materials and instantly generate professional
              multiple-choice exams with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 text-lg px-8 py-6 cursor-pointer"
              >
                <Link href="/dashboard">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 text-lg px-8 py-6"
              >
                Watch Demo
              </Button> */}
            </div>
            {/* <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>Free plan available</span>
              </div>
            </div> */}
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      {/* <section className="bg-slate-900/50 py-12 border-t border-b border-slate-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-400 mb-8">Trusted by educators at leading institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {["Stanford University", "MIT", "Harvard", "Oxford", "Berkeley"].map((name, i) => (
              <div
                key={i}
                className="text-slate-500 font-semibold text-lg opacity-70 hover:opacity-100 transition-opacity"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-blue-900/50 text-blue-300 border-blue-700 mb-4">Features</Badge>
          <h2 className="text-4xl font-bold mb-6">Revolutionize Your Exam Creation Process</h2>
          <p className="text-slate-300 text-lg">
            Our platform uses advanced AI to analyze your documents and generate high-quality, customizable exams in
            minutes, not hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText className="h-6 w-6 text-purple-400" />}
            title="Document Analysis"
            description="Upload PDFs, Word docs, or text files. Our AI extracts key concepts and knowledge points."
            gradient="from-purple-600 to-purple-400"
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-cyan-400" />}
            title="Instant Generation"
            description="Create comprehensive exams in seconds with smart, contextually relevant questions."
            gradient="from-cyan-600 to-cyan-400"
          />
          <FeatureCard
            icon={<BookOpen className="h-6 w-6 text-blue-400" />}
            title="Custom Question Banks"
            description="Build and maintain question banks organized by topic, difficulty, and more."
            gradient="from-blue-600 to-blue-400"
          />
          <FeatureCard
            icon={<CheckCircle className="h-6 w-6 text-green-400" />}
            title="Answer Validation"
            description="AI-verified correct answers and distractors ensure high-quality assessments."
            gradient="from-green-600 to-green-400"
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-amber-400" />}
            title="Performance Analytics"
            description="Track student performance with detailed analytics and insights."
            gradient="from-amber-600 to-amber-400"
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6 text-pink-400" />}
            title="Adaptive Learning"
            description="Our system learns from your feedback to generate better questions over time."
            gradient="from-pink-600 to-pink-400"
          />
        </div>
      </section> */}

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="bg-slate-900/50 py-32 border-t border-slate-800"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* <Badge className="bg-cyan-900/50 text-cyan-300 border-cyan-700 mb-4">How It Works</Badge> */}
            <h2 className="text-4xl font-bold mb-6">Three Simple Steps</h2>
            <p className="text-slate-300 text-lg">
              Our streamlined process makes exam creation effortless, allowing
              you to focus on learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 top-[250px]"></div>

            {/* Steps */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mt-4 mb-4 text-center">
                Upload Documents
              </h3>
              <p className="text-slate-300 text-center">
                Upload your lecture notes, textbooks, or learning materials in
                various formats.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mt-4 mb-4 text-center">
                Generate Exams
              </h3>
              <p className="text-slate-300 text-center">
                Generate exams with questions tailored to your learning
                materials.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mt-4 mb-4 text-center">
                Test and Review
              </h3>
              <p className="text-slate-300 text-center">
                Test your knowledge, review your performance, and learn from
                your mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-purple-900/50 text-purple-300 border-purple-700 mb-4">Testimonials</Badge>
          <h2 className="text-4xl font-bold mb-6">Loved by Educators</h2>
          <p className="text-slate-300 text-lg">
            See what teachers and professors are saying about our exam generation platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="This tool has saved me countless hours of work. The quality of the generated questions is impressive."
            author="Dr. Sarah Johnson"
            role="Professor of Biology"
            image="/placeholder.svg?height=80&width=80"
          />
          <TestimonialCard
            quote="I was skeptical at first, but the AI really understands the nuances of my course material and creates relevant questions."
            author="Mark Williams"
            role="High School Teacher"
            image="/placeholder.svg?height=80&width=80"
          />
          <TestimonialCard
            quote="The ability to quickly generate different versions of the same exam for multiple classes is a game-changer."
            author="Prof. Lisa Chen"
            role="Computer Science Department"
            image="/placeholder.svg?height=80&width=80"
          />
        </div>
      </section> */}

      {/* Pricing Section */}
      {/* <section id="pricing" className="bg-slate-900/50 py-24 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/50 text-blue-300 border-blue-700 mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-slate-300 text-lg">
              Choose the plan that fits your needs. All plans include core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price="Free"
              description="Perfect for trying out the platform"
              features={["5 exams per month", "Up to 20 questions per exam", "Basic document analysis", "PDF export"]}
              buttonText="Get Started"
              buttonVariant="outline"
            />

            <PricingCard
              title="Professional"
              price="$29"
              period="per month"
              description="For individual educators"
              features={[
                "Unlimited exams",
                "Up to 100 questions per exam",
                "Advanced document analysis",
                "Multiple export formats",
                "Question bank management",
              ]}
              buttonText="Start Free Trial"
              buttonVariant="default"
              highlighted={true}
            />

            <PricingCard
              title="Institution"
              price="$99"
              period="per month"
              description="For schools and universities"
              features={[
                "Everything in Professional",
                "Multiple user accounts",
                "LMS integration",
                "Advanced analytics",
                "Priority support",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-30"></div>
          <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Exam Creation?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Get started for free and start creating your own exams in minutes.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 text-lg px-8 py-6"
            >
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            {/* <p className="text-slate-400 mt-4">No credit card required</p> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                SnapQuiz
              </span>
            </div>
            <p className="text-slate-400">
              AI-powered exam generation for modern educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 SnapQuiz. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
