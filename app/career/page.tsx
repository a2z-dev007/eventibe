"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
    Heart,
    Users,
    Target,
    TrendingUp,
    Sparkles,
    ArrowRight,
    CheckCircle,
    Briefcase,
    Globe2,
    Lightbulb,
    Award,
    Send,
    X,
    MapPin,
    Clock,
    Upload,
    Search,
    ChevronLeft,
    ChevronRight,
    Loader2,
    BadgeIndianRupee,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard, MagneticButton } from "@/components/micro-interactions";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface JobOpening {
    id: number;
    title: string;
    type: string;
    department: number;
    department_name: string;
    expected_salary: string;
    experience_required: string;
    no_of_posts: number;
    description: string;
    status: string;
    created: string;
    created_by: number;
    full_name: string;
}

const CareerPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
    const [showJobModal, setShowJobModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const itemsPerPage = 6;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
        attachment: null as File | null,
    });

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mounted) {
            fetchJobs();
        }
    }, [mounted]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const { getJobs } = await import("@/services/api");
            const response = await getJobs();
            const data = response.data;

            if (data.status === "success") {
                setJobOpenings(data.records);
                setTotalRecords(data.totalRecords);
            } else {
                console.error("Failed to fetch jobs:", data);
                setJobOpenings([]);
            }
        } catch (error: any) {
            console.error("Error fetching jobs:", error);
            const errorMessage = error?.message || "Failed to load job openings";
            console.error(errorMessage);
            setJobOpenings([]);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    // Filter jobs based on search query
    const filteredJobs = jobOpenings.filter((job) => {
        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase();
        const title = job.title.toLowerCase();
        const department = job.department_name.toLowerCase();
        const type = job.type.toLowerCase();

        return (
            title.includes(query) ||
            department.includes(query) ||
            type.includes(query)
        );
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayJobs = filteredJobs.slice(startIndex, endIndex);

    const handleJobClick = (job: JobOpening) => {
        setSelectedJob(job);
        setShowJobModal(true);
    };

    const handleApplyClick = () => {
        setShowJobModal(false);
        setShowApplyModal(true);
    };

    const handleCloseModals = () => {
        setShowJobModal(false);
        setShowApplyModal(false);
        setSelectedJob(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, attachment: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedJob || !formData.attachment) {
            toast.error("Please fill all required fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        try {
            setSubmitting(true);

            // Create FormData and append file in binary format
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("job", selectedJob.id.toString());
            // Append file directly in binary format
            formDataToSend.append("attachment", formData.attachment);

            const { applyJob } = await import("@/services/api");
            const response = await applyJob(formDataToSend);
            const data = response.data;

            if (data.status === "success") {
                toast.success(data.message || "Application submitted successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                handleCloseModals();
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    description: "",
                    attachment: null,
                });
            } else {
                toast.error(data.message || "Failed to submit application. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const coreValues = [
        {
            icon: Users,
            title: "Diversity and Inclusion",
            description: "We celebrate diversity and believe that a variety of perspectives strengthens our team.",
            color: "from-blue-400 to-cyan-400",
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "Embrace creativity and stay at the forefront of industry trends to drive innovation.",
            color: "from-orange-400 to-pink-400",
        },
        {
            icon: CheckCircle,
            title: "Integrity",
            description: "Uphold the highest ethical standards in all our interactions, both internally and externally.",
            color: "from-green-400 to-emerald-400",
        },
    ];

    const whySpodia = [
        {
            icon: Lightbulb,
            title: "Innovative Environment",
            description: "Be a part of a dynamic and innovative work culture that encourages creativity and forward-thinking.",
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Collaborate with a diverse team of professionals who are dedicated to achieving common goals.",
        },
        {
            icon: TrendingUp,
            title: "Career Growth",
            description: "We invest in our employees' growth and development, offering opportunities for advancement and continuous learning.",
        },
        {
            icon: Heart,
            title: "Impactful Work",
            description: "Contribute to projects that have a meaningful impact on our customers and the community.",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <ToastContainer />
            <Header />
            <main className="overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 bg-hero-gradient text-white overflow-hidden">
                    {/* Pattern Background Overlay */}
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
                    
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-[10%] w-72 h-72 bg-accent-orange/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-40 right-[15%] w-96 h-96 bg-mid-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-corporate-blue/10 to-accent-orange/10 rounded-full blur-3xl"
                        ></motion.div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none opacity-30">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-white rounded-full animate-float"
                                style={{
                                    left: `${(i * 15) % 100}%`,
                                    top: `${(i * 25) % 100}%`,
                                    animationDelay: `${i * 0.5}s`,
                                    animationDuration: `${3 + i * 0.4}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-10 border border-white/20 shadow-2xl"
                        >
                            <Briefcase className="w-5 h-5 text-accent-orange" />
                            <span className="text-white font-black uppercase tracking-widest text-xs">Join Our Mission</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight"
                        >
                            Your Career in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-orange-400 to-pink-400">
                                Hospitality
                            </span> Starts Here
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-14 leading-relaxed font-medium"
                        >
                            Join the Eventibe Team: Shaping the Future of Global Event Planning and Hospitality.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        >
                            <MagneticButton>
                                <button
                                    onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group relative flex items-center justify-center gap-3 px-12 py-6 bg-cta-gradient text-white font-black rounded-2xl transition-all shadow-[0_20px_50px_rgba(249,115,22,0.3)] hover:shadow-[0_25px_60px_rgba(249,115,22,0.5)] active:scale-95 text-lg"
                                >
                                    Explore Opportunities
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                </button>
                            </MagneticButton>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-8 h-12 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
                        >
                            <div className="w-1.5 h-3 bg-accent-orange rounded-full animate-pulse"></div>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="py-24 relative overflow-hidden bg-white">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-20">
                            <div className="flex-1">
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 bg-orange-50 text-accent-orange px-5 py-2.5 rounded-full mb-8 font-black uppercase tracking-widest text-xs border border-orange-100"
                                >
                                    <Target className="w-4 h-4" />
                                    Our Mission
                                </motion.div>
                                <motion.h2 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl md:text-6xl font-black mb-8 text-primary-navy tracking-tight leading-tight"
                                >
                                    More Than Just <br />
                                    <span className="text-corporate-blue">a Job</span>
                                </motion.h2>
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-6 text-xl text-soft-slate leading-relaxed font-medium"
                                >
                                    <p>
                                        At Eventibe, we&apos;re on a mission to redefine event experiences, and we believe it starts with the right team. We are seeking passionate and talented individuals who share our unwavering commitment to excellence.
                                    </p>
                                    <p>
                                        If you&apos;re enthusiastic about shaping the future of hospitaliy and making a positive impact in the world, Eventibe is the place for you. Join us in creating memorable journeys and contributing to the growth of responsible tourism.
                                    </p>
                                </motion.div>
                            </div>
                            <div className="flex-1 w-full">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-corporate-blue/20 to-accent-orange/20 rounded-[48px] blur-2xl -z-10 animate-pulse" />
                                    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-corporate-blue/5 rounded-full -ml-16 -mb-16 blur-2xl" />
                                        
                                        <div className="flex flex-col gap-8">
                                            <div className="flex items-start gap-6">
                                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-corporate-blue shrink-0">
                                                    <Heart className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-primary-navy mb-2">Passion Driven</h4>
                                                    <p className="text-soft-slate font-medium">We lead with heart and excellence in everything we do.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-6">
                                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-accent-orange shrink-0">
                                                    <Sparkles className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-primary-navy mb-2">Future Forward</h4>
                                                    <p className="text-soft-slate font-medium">Innovation is the heartbeat of our platform.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-6">
                                                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                                    <Users className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-primary-navy mb-2">Community First</h4>
                                                    <p className="text-soft-slate font-medium">Impact on local communities is our ultimate goal.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Join Us */}
                <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
                    
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-blue-50 text-corporate-blue px-5 py-2.5 rounded-full mb-6 font-black uppercase tracking-widest text-xs border border-blue-100"
                            >
                                <Sparkles className="w-4 h-4" />
                                Why Join Us
                            </motion.div>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black mb-6 text-primary-navy tracking-tight"
                            >
                                Life at <span className="text-accent-orange">Eventibe</span>
                            </motion.h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whySpodia.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <TiltCard key={index} className="h-full">
                                        <div className="group bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-gray-100 hover:border-accent-orange/30 transition-all duration-500 h-full flex flex-col items-center text-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 text-corporate-blue group-hover:bg-cta-gradient group-hover:text-white transition-all duration-500 ring-4 ring-gray-50 group-hover:ring-orange-500/10">
                                                <Icon className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-xl font-black mb-4 text-primary-navy group-hover:text-accent-orange transition-colors">{item.title}</h3>
                                            <p className="text-soft-slate font-medium leading-relaxed">{item.description}</p>
                                        </div>
                                    </TiltCard>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Current Openings */}
                <section id="openings" className="py-32 bg-primary-navy text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f8fafc] to-transparent opacity-10" />
                    
                    <div className="absolute top-20 right-20 w-96 h-96 bg-accent-orange/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-corporate-blue/20 rounded-full blur-[150px] animate-pulse delay-1000"></div>

                    <div className="relative max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-accent-orange px-6 py-3 rounded-full mb-8 font-black uppercase tracking-widest text-xs border border-white/20 shadow-2xl"
                            >
                                <Briefcase className="w-5 h-5" />
                                Open Positions
                            </motion.div>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
                            >
                                Career <span className="text-accent-orange">Opportunities</span>
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-medium"
                            >
                                Join a high-performance team building the world&apos;s most reliable event marketplace.
                            </motion.p>
                        </div>

                        {/* Search Bar - Premium UI */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mb-16 max-w-3xl mx-auto"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-corporate-blue via-accent-orange to-pink-500 rounded-[32px] blur-sm opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-2 pr-4 shadow-2xl overflow-hidden">
                                    <div className="flex items-center justify-center pl-6 pr-4 text-white/40">
                                        <Search className="w-6 h-6" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by job title, department, or type..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full py-5 bg-transparent text-white placeholder-white/30 focus:outline-none text-lg font-medium"
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => setSearchQuery("")}
                                            className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-blue-100">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 animate-pulse h-64">
                                        <div className="h-8 bg-white/10 rounded-full w-3/4 mb-6"></div>
                                        <div className="space-y-3">
                                            <div className="h-5 bg-white/10 rounded-full w-1/2"></div>
                                            <div className="h-5 bg-white/10 rounded-full w-2/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : displayJobs.length > 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8 mb-16"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {displayJobs.map((job) => (
                                            <motion.div
                                                key={job.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                onClick={() => handleJobClick(job)}
                                                className="group bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[40px] border border-white/10 hover:border-accent-orange/50 transition-all duration-500 hover:bg-white/10 cursor-pointer relative overflow-hidden flex flex-col justify-between"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-orange/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                
                                                <div>
                                                    <div className="flex items-start justify-between mb-8">
                                                        <div className="space-y-2">
                                                            <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest text-accent-orange w-fit">
                                                                {job.department_name}
                                                            </div>
                                                            <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-accent-orange transition-colors">
                                                                {job.title}
                                                            </h3>
                                                        </div>
                                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-orange group-hover:border-accent-orange transition-all duration-500 shrink-0">
                                                            <ArrowRight className="w-7 h-7 text-white" />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-6 mb-8 text-white/60">
                                                        <div className="flex items-center gap-2.5 font-bold text-sm">
                                                            <div className="p-2 rounded-lg bg-white/5">
                                                                <Clock className="w-4 h-4 text-corporate-blue" />
                                                            </div>
                                                            <span>{job.type}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2.5 font-bold text-sm">
                                                            <div className="p-2 rounded-lg bg-white/5">
                                                                <BadgeIndianRupee className="w-4 h-4 text-emerald-400" />
                                                            </div>
                                                            <span>{job.expected_salary}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2.5 font-bold text-sm">
                                                            <div className="p-2 rounded-lg bg-white/5">
                                                                <Users className="w-4 h-4 text-orange-400" />
                                                            </div>
                                                            <span>{job.no_of_posts} Position{job.no_of_posts > 1 ? 's' : ''}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2.5 h-2.5 rounded-full ${job.status === 'Open' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-gray-500'}`} />
                                                        <span className={`text-xs font-black uppercase tracking-[0.2em] ${job.status === 'Open' ? 'text-emerald-400' : 'text-white/40'}`}>
                                                            {job.status}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Updated {new Date(job.created).toLocaleDateString()}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="text-center py-32 mb-20 bg-white/5 backdrop-blur-md rounded-[48px] border border-white/10">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                                    <Briefcase className="w-10 h-10 text-white/20" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4">
                                    {searchQuery ? "No positions found" : "No openings available"}
                                </h3>
                                <p className="text-xl text-white/40 font-medium italic">
                                    {searchQuery ? "Try adjusting your search criteria..." : "Check back later for fresh opportunities!"}
                                </p>
                            </div>
                        )}

                        {/* Pagination - Premium Styled */}
                        {totalPages > 1 && (
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-white/5 backdrop-blur-md p-8 rounded-[32px] border border-white/10">
                                <div className="text-lg font-bold text-white/40">
                                    Showing <span className="text-white">{startIndex + 1}-{Math.min(endIndex, filteredJobs.length)}</span> of <span className="text-white">{filteredJobs.length}</span> positions
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="h-14 px-8 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Previous
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-14 h-14 rounded-2xl font-black transition-all flex items-center justify-center border ${currentPage === page 
                                                    ? "bg-accent-orange border-accent-orange text-white shadow-xl shadow-orange-500/30 scale-110 z-10" 
                                                    : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20"}`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="h-14 px-8 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                                    >
                                        Next <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 relative bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-orange-50 text-accent-orange px-5 py-2.5 rounded-full mb-6 font-black uppercase tracking-widest text-xs border border-orange-100"
                            >
                                <Award className="w-4 h-4" />
                                Our Pillars
                            </motion.div>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black mb-6 text-primary-navy tracking-tight"
                            >
                                What We <span className="text-corporate-blue">Value</span>
                            </motion.h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {coreValues.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <TiltCard key={index} className="h-full">
                                        <div className="group bg-white rounded-[40px] p-10 shadow-2xl shadow-blue-900/5 border border-gray-100 hover:shadow-orange-500/10 hover:border-accent-orange/20 transition-all duration-500 h-full text-center flex flex-col items-center">
                                            <div className={`w-24 h-24 bg-gradient-to-br ${value.color} rounded-[32px] flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                                <Icon className="w-10 h-10 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-black mb-4 text-primary-navy">{value.title}</h3>
                                            <p className="text-soft-slate font-medium leading-relaxed">{value.description}</p>
                                        </div>
                                    </TiltCard>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* How to Apply */}
                <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-20">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-blue-50 text-corporate-blue px-5 py-2.5 rounded-full mb-6 font-black uppercase tracking-widest text-xs border border-blue-100"
                            >
                                <Send className="w-4 h-4" />
                                The Path to Success
                            </motion.div>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black mb-6 text-primary-navy tracking-tight"
                            >
                                How to <span className="text-accent-orange">Apply</span>
                            </motion.h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                            {[
                                { step: "01", title: "Browse Openings", description: "Explore our dynamic job board and find the role that speaks to your expertise." },
                                { step: "02", title: "Review Details", description: "Dive into the specifics of the role and ensure your skills align with our mission." },
                                { step: "03", title: "Submit Application", description: "Share your journey with us through our streamlined application system." },
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-[40px] p-10 shadow-2xl shadow-blue-900/5 border border-gray-100 relative overflow-hidden"
                                >
                                    <div className="text-6xl font-black text-blue-50 mb-8 group-hover:text-accent-orange/10 transition-colors duration-500">{item.step}</div>
                                    <h3 className="text-2xl font-black mb-4 text-primary-navy">{item.title}</h3>
                                    <p className="text-lg text-soft-slate font-medium leading-relaxed">{item.description}</p>
                                    <div className="mt-8 h-1.5 w-12 bg-gray-100 group-hover:bg-accent-orange rounded-full transition-all duration-500 group-hover:w-20" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Connect With Us */}
                <section className="py-32 bg-primary-navy text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent-orange/10 rounded-full blur-[150px] pointer-events-none" />
                    
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-accent-orange px-6 py-3 rounded-full mb-8 font-black uppercase tracking-widest text-xs border border-white/20 shadow-2xl"
                        >
                            <Globe2 className="w-5 h-5" />
                            Global Network
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-black mb-8 tracking-tight"
                        >
                            Stay <span className="text-corporate-blue">Connected</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
                        >
                            Join our community to receive updates on high-impact roles, company culture, and event industry breakthroughs.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-6 mb-24"
                        >
                            {[
                                { label: "LinkedIn", href: "#" },
                                { label: "Twitter / X", href: "#" },
                                { label: "Instagram", href: "#" },
                                { label: "Facebook", href: "#" },
                            ].map((social, index) => (
                                <MagneticButton key={index}>
                                    <Link
                                        target="_blank"
                                        href={social.href}
                                        className="group flex items-center gap-4 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 hover:border-accent-orange/50 hover:bg-white/10 transition-all duration-500"
                                    >
                                        <Globe2 className="w-6 h-6 text-accent-orange group-hover:scale-110 transition-transform duration-500" />
                                        <span className="font-black uppercase tracking-widest text-xs">{social.label}</span>
                                    </Link>
                                </MagneticButton>
                            ))}
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-2xl p-10 md:p-20 rounded-[64px] border border-white/10 max-w-5xl mx-auto relative overflow-hidden"
                        >
                             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                             <div className="absolute bottom-0 left-0 w-64 h-64 bg-corporate-blue/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
                             
                            <p className="text-xl md:text-3xl font-bold leading-relaxed text-white/80 mb-12">
                                At Eventibe, we invite you to embark on a journey of discovery, enrichment, and connection. Let us be your trusted partner in creating event experiences that transcend the ordinary.
                            </p>
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-1.5 w-24 bg-cta-gradient rounded-full mb-4" />
                                <p className="text-sm font-black uppercase tracking-[0.3em] text-white/30">
                                    Eventibe is an Equal Opportunity Innovator
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Job Description Modal */}
            <AnimatePresence>
                {showJobModal && selectedJob && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModals}
                            className="absolute inset-0 bg-primary-navy/80 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[48px] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_40px_100px_rgba(11,31,58,0.3)] overflow-hidden relative z-10 border border-white/20"
                        >
                            <div className="bg-white border-b border-gray-100 p-10 flex items-start justify-between flex-shrink-0 relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                                
                                <div className="relative">
                                    <div className="px-5 py-2 rounded-full bg-blue-50 text-corporate-blue text-xs font-black uppercase tracking-widest w-fit mb-6 border border-blue-100">
                                        {selectedJob.department_name}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-primary-navy mb-8 tracking-tighter">{selectedJob.title}</h2>
                                    
                                    <div className="flex flex-wrap gap-x-10 gap-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-corporate-blue">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-soft-slate/40 leading-none mb-1 text-left italic">Type</p>
                                                <p className="text-sm font-bold text-primary-navy leading-none">{selectedJob.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-500">
                                                <BadgeIndianRupee className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-soft-slate/40 leading-none mb-1 text-left italic">Salary</p>
                                                <p className="text-sm font-bold text-primary-navy leading-none">{selectedJob.expected_salary}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-orange-500">
                                                <Award className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-soft-slate/40 leading-none mb-1 text-left italic">Exp. Req</p>
                                                <p className="text-sm font-bold text-primary-navy leading-none">{selectedJob.experience_required} Years</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCloseModals}
                                    className="p-4 hover:bg-gray-100 rounded-2xl transition-all hover:rotate-90 group"
                                >
                                    <X className="w-7 h-7 text-gray-400 group-hover:text-primary-navy" />
                                </button>
                            </div>

                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                <div className="p-10 md:p-14">
                                    <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-primary-navy prose-p:text-soft-slate prose-p:font-medium prose-p:leading-relaxed">
                                        <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border-t border-gray-100 p-10 flex-shrink-0 relative">
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-corporate-blue/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
                                <MagneticButton>
                                    <Button
                                        onClick={handleApplyClick}
                                        disabled={selectedJob.status !== 'Open'}
                                        className="w-full bg-cta-gradient h-20 text-white font-black rounded-3xl text-xl transition-all shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 disabled:opacity-50 disabled:grayscale tracking-tight"
                                    >
                                        {selectedJob.status === 'Open' ? (
                                            <span className="flex items-center gap-3">
                                                Apply for this Position <ArrowRight className="w-6 h-6" />
                                            </span>
                                        ) : `Status: ${selectedJob.status}`}
                                    </Button>
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Apply Job Modal */}
            <AnimatePresence>
                {showApplyModal && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModals}
                            className="absolute inset-0 bg-primary-navy/80 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[48px] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_40px_100px_rgba(11,31,58,0.3)] overflow-hidden relative z-10 border border-white/20"
                        >
                            <div className="bg-white border-b border-gray-100 p-10 flex items-center justify-between flex-shrink-0 relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                                <div>
                                    <h2 className="text-4xl font-black text-primary-navy tracking-tight">Apply for Position</h2>
                                    <p className="text-soft-slate font-medium mt-2">Join our world-class hospitality team.</p>
                                </div>
                                <button
                                    onClick={handleCloseModals}
                                    className="p-4 hover:bg-gray-100 rounded-2xl transition-all hover:rotate-90 group"
                                >
                                    <X className="w-7 h-7 text-gray-400 group-hover:text-primary-navy" />
                                </button>
                            </div>

                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                <form onSubmit={handleSubmit} className="p-10 md:p-14">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-3">
                                            <label className="block text-sm font-black uppercase tracking-widest text-primary-navy ml-1">
                                                Full Name <span className="text-accent-orange">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter your name"
                                                required
                                                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-accent-orange/50 outline-none transition-all font-medium text-primary-navy"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-sm font-black uppercase tracking-widest text-primary-navy ml-1">
                                                Email Address <span className="text-accent-orange">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter your email"
                                                required
                                                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-accent-orange/50 outline-none transition-all font-medium text-primary-navy"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-3">
                                            <label className="block text-sm font-black uppercase tracking-widest text-primary-navy ml-1">
                                                Phone Number <span className="text-accent-orange">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter your phone"
                                                required
                                                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-accent-orange/50 outline-none transition-all font-medium text-primary-navy"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-sm font-black uppercase tracking-widest text-primary-navy ml-1">
                                                Resume / CV <span className="text-accent-orange">*</span>
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    name="attachment"
                                                    onChange={handleFileChange}
                                                    required
                                                    accept=".pdf,.doc,.docx"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full px-6 py-5 bg-gray-50 border border-dashed border-gray-200 rounded-2xl group-hover:border-accent-orange/50 group-hover:bg-orange-50/30 transition-all flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent-orange">
                                                        <Upload className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-soft-slate font-medium truncate">
                                                        {formData.attachment ? formData.attachment.name : "Upload PDF or DOC"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-10">
                                        <label className="block text-sm font-black uppercase tracking-widest text-primary-navy ml-1">
                                            Cover Letter / Experience <span className="text-accent-orange">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Tell us why you're a great fit for this role..."
                                            required
                                            rows={6}
                                            className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-accent-orange/50 outline-none transition-all font-medium text-primary-navy resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-gray-100">
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-corporate-blue/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
                                        <MagneticButton>
                                            <Button
                                                type="submit"
                                                disabled={submitting}
                                                className="bg-cta-gradient h-20 px-12 text-white font-black rounded-3xl text-xl transition-all shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 disabled:opacity-50 disabled:grayscale flex items-center gap-4 tracking-tight"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 className="w-6 h-6 animate-spin" />
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Application
                                                        <ArrowRight className="w-6 h-6" />
                                                    </>
                                                )}
                                            </Button>
                                        </MagneticButton>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CareerPage;
