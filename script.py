import re
import os

file_path = r'd:\ClientProject\eventibe\app\privacy-policy\page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
if 'import React' not in content:
    content = content.replace('import Image from', 'import React, { useState, useEffect, useRef } from "react";\nimport { motion } from "motion/react";\nimport { Files } from "lucide-react";\nimport Image from')

# 2. Add sections array and fadeInUp outside the component
if 'const sections =' not in content:
    sections_code = """
const sections = [
  { id: "about", title: "About Us", icon: <Info size={24} /> },
  { id: "collect", title: "Information We Collect", icon: <Database size={24} /> },
  { id: "use", title: "How We Use Information", icon: <ShieldCheck size={24} /> },
  { id: "share", title: "Sharing Information", icon: <Share2 size={24} /> },
  { id: "retention", title: "Data Retention", icon: <Clock size={24} /> },
  { id: "security", title: "Data Security", icon: <Lock size={24} /> },
  { id: "links", title: "Third-Party Links", icon: <ExternalLink size={24} /> },
  { id: "children", title: "Children's Privacy", icon: <UserX size={24} /> },
  { id: "rights", title: "Your Rights", icon: <UserCheck size={24} /> },
  { id: "international", title: "International Transfers", icon: <Globe size={24} /> },
  { id: "business", title: "Business Transfers", icon: <Briefcase size={24} /> },
  { id: "changes", title: "Changes to Policy", icon: <RefreshCw size={24} /> },
  { id: "contact", title: "Contact Information", icon: <Mail size={24} /> },
  { id: "consent", title: "Consent", icon: <CheckCircle2 size={24} /> },
];

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};
"""
    content = content.replace('export default function PrivacyPolicyPage() {', sections_code + '\nexport default function PrivacyPolicyPage() {')

# 3. Component state and effects
hook_code = """
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -45% 0px",
      threshold: [0, 0.1, 0.5, 1.0],
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      activeSection &&
      navItemsRef.current[activeSection] &&
      scrollContainerRef.current
    ) {
      const scrollContainer = scrollContainerRef.current;
      const navItem = navItemsRef.current[activeSection];

      const containerTop = scrollContainer.getBoundingClientRect().top;
      const navItemTop = navItem.getBoundingClientRect().top;
      const relativeTop = navItemTop - containerTop;

      scrollContainer.scrollTo({
        top:
          scrollContainer.scrollTop +
          relativeTop -
          scrollContainer.clientHeight / 2 +
          navItem.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeSection]);
"""
if 'const [activeSection' not in content:
    content = content.replace('export default function PrivacyPolicyPage() {', 'export default function PrivacyPolicyPage() {\n' + hook_code)

# 4. Modify Hero Section
hero_replace = '''        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center md:text-left">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 ml-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 animate-fade-in shadow-xl backdrop-blur-sm">
              <ShieldCheck size={14} />
              <span>Trust & Transparency</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-fade-in tracking-tight">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-300">
                Policy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in [animation-delay:200ms] font-medium">
              At Eventibe, your privacy is our priority. We are committed to
              protecting your data and being transparent about how we handle
              your information.
            </p>
          </div>
        </div>'''
hero_new = '''        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl flex flex-col items-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 animate-fade-in shadow-xl backdrop-blur-sm">
              <ShieldCheck size={14} />
              <span>Trust & Transparency</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-fade-in tracking-tight">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-300">
                Policy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in [animation-delay:200ms] font-medium text-center">
              At Eventibe, your privacy is our priority. We are committed to
              protecting your data and being transparent about how we handle
              your information.
            </p>
          </motion.div>
        </div>'''

if 'className="container mx-auto px-4 md:px-6 relative z-10 text-center md:text-left"' in content:
    content = content.replace(hero_replace, hero_new)


# 5. Remove numbers from headers e.g. "1. ABOUT US"
content = re.sub(r'(\d+\.\s+)(ABOUT US|INFORMATION WE COLLECT|HOW WE USE INFORMATION|SHARING INFORMATION|DATA RETENTION|DATA SECURITY|THIRD-PARTY LINKS|CHILDREN’S PRIVACY|YOUR RIGHTS|INTERNATIONAL TRANSFER|BUSINESS TRANSFERS|CHANGES TO THIS POLICY|CONTACT INFORMATION|CONSENT|THIRD-PARTY CONTENT & LINKS)', r'\2', content)

# Remove numbers from h3 class matching \d+\.\d+\s+...
# like "2.1 Information You Provide Directly" - the user said "Remove numbering from headings", maybe that too.
content = re.sub(r'(>)\d+\.\d+\s+([A-Z])', r'\1\2', content)

# 6. Sidebar styling
sidebar_old = '''            {/* Table of Contents - Desktop Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 self-start space-y-4">'''

# Let's find exactly the aside
match = re.search(r'<aside className="hidden lg:block lg:col-span-4 sticky top-24 self-start space-y-4">.*?</aside>', content, re.DOTALL)
if match:
    old_aside = match.group(0)
    new_aside = """            {/* Sidebar Navigation - Sticky */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-28 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
                <div className="p-8 pb-6 border-b border-slate-50 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                      <Files size={14} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      DOCUMENT INDEX
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-primary-navy tracking-tight">
                    Quick Navigation
                  </h3>
                </div>

                <nav
                  ref={scrollContainerRef}
                  className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar scroll-smooth"
                >
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <Link
                        key={section.id}
                        href={`#${section.id}`}
                        ref={(el) => {
                          navItemsRef.current[section.id] = el;
                        }}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                          isActive
                            ? "bg-primary-navy/5 text-primary-navy shadow-[inset_0_0_0_1px_rgba(11,31,58,0.05)]"
                            : "text-slate-500 hover:text-primary-navy hover:bg-slate-50"
                        }`}
                      >
                        {/* Status Indicator */}
                        <div
                          className={`absolute left-0 w-1.5 bg-accent-orange rounded-r-full transition-all duration-300 ${
                            isActive
                              ? "h-6 opacity-100"
                              : "h-0 opacity-0 group-hover:h-2"
                          }`}
                        ></div>

                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-primary-navy text-white shadow-lg shadow-blue-900/20"
                              : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-primary-navy group-hover:shadow-sm"
                          }`}
                        >
                          <div className="scale-75 origin-center">
                            {section.icon}
                          </div>
                        </div>

                        <span
                          className={`text-[13px] font-bold truncate transition-all leading-snug flex-1 ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                        >
                          {section.title}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute -right-1 w-1 h-1 rounded-full bg-accent-orange"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-6 bg-slate-50/80 mt-auto border-t border-slate-100 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    LEGAL COMPLIANCE
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                </div>
              </div>
            </aside>"""
    content = content.replace(old_aside, new_aside)

content = content.replace('<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">', '<div className="flex flex-col lg:flex-row gap-16">')
content = content.replace('<main className="lg:col-span-8 space-y-12 md:space-y-16">', '<main className="lg:w-3/4 space-y-8 md:space-y-20">')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("done")
