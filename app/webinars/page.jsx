"use client";

import React, { useState, useEffect, useRef } from "react";
import { CalendarDays, User, Star } from "lucide-react";

const webinars = [
    {
        id: 1,
        title: "Nutrition Tips for Children",
        speaker: "Dr. Sumitra Meena",
        date: "2025-06-10T10:00:00",
        image: "/nutrition.jpg",
        registered: 120,
        categories: ["Nutrition", "Health"],
    },
    {
        id: 2,
        title: "Handling Sleep Regression",
        speaker: "Dr. Ramesh Sharma",
        date: "2025-06-15T15:00:00",
        image: "/sleeping.jpg",
        registered: 195,
        categories: ["Parenting", "Health"],
    },
    {
        id: 3,
        title: "Vaccination Myths Busted",
        speaker: "Dr. Asha Gupta",
        date: "2025-06-20T11:30:00",
        image: "/vaccination.jpg",
        registered: 150,
        categories: ["Health"],
    },
    {
        id: 4,
        title: "Baby's First Year Milestones",
        speaker: "Dr. Kavita Rao",
        date: "2025-06-25T09:00:00",
        image: "/one.jpg",
        registered: 85,
        categories: ["Development", "Parenting"],
    },
    {
        id: 5,
        title: "Managing Postpartum Anxiety",
        speaker: "Dr. Nisha Verma",
        date: "2025-07-01T14:00:00",
        image: "/postpartumAnxiety.jpg",
        registered: 110,
        categories: ["Health", "Parenting"],
    },
    {
        id: 6,
        title: "Home Remedies for Common Infant Issues",
        speaker: "Dr. Harshita Mehta",
        date: "2025-07-05T16:00:00",
        image: "/homeRemedy.jpg",
        registered: 75,
        categories: ["Health"],
    },
    {
        id: 7,
        title: "The Truth About Teething",
        speaker: "Dr. Vikram Desai",
        date: "2025-07-10T10:30:00",
        image: "/teething.jpg",
        registered: 130,
        categories: ["Development", "Health"],
    },
    {
        id: 8,
        title: "Parenting in the Digital Age",
        speaker: "Dr. Anjali Singh",
        date: "2025-07-15T13:00:00",
        image: "/digitalParenting.jpg",
        registered: 90,
        categories: ["Parenting"],
    },
    {
        id: 9,
        title: "Early Signs of Developmental Delays",
        speaker: "Dr. Ravi Nair",
        date: "2025-07-20T11:00:00",
        image: "/developmentDelays.jpg",
        registered: 80,
        categories: ["Development"],
    },
    {
        id: 10,
        title: "Building Immune System Naturally",
        speaker: "Dr. Meera Joshi",
        date: "2025-07-25T09:30:00",
        image: "/sickInfant.jpg",
        registered: 100,
        categories: ["Health", "Nutrition"],
    },
];

const testimonials = [
    {
        id: 1,
        quote:
            "The webinars are incredibly insightful! I learned so much about child nutrition.",
        name: "Asha Patel",
        rating: 5,
    },
    {
        id: 2,
        quote: "Great speakers and easy to understand content. Highly recommended!",
        name: "Rahul Singh",
        rating: 4,
    },
    {
        id: 3,
        quote: "Helped me manage my baby's sleep better. Thank you!",
        name: "Priya Mehta",
        rating: 5,
    },
];
  
function useCountdown(targetDate) {
    const countDownDate = new Date(targetDate).getTime();

    const [countdown, setCountdown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            setCountdown(distance > 0 ? distance : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isEnded: countdown === 0 };
}

const WebinarsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterStatus, setNewsletterStatus] = useState(null); 

    const allCategories = Array.from(
        new Set(webinars.flatMap((w) => w.categories))
    ).sort();

    const today = new Date();

    const filteredWebinars = webinars.filter((webinar) => {
        const matchesSearch =
            webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            webinar.speaker.toLowerCase().includes(searchTerm.toLowerCase());

        const webinarDate = new Date(webinar.date);
        let matchesFilter = true;
        if (filterType === "upcoming") {
            matchesFilter = webinarDate >= today;
        } else if (filterType === "past") {
            matchesFilter = webinarDate < today;
        }

        const matchesCategory =
            categoryFilter === "all" || webinar.categories.includes(categoryFilter);

        return matchesSearch && matchesFilter && matchesCategory;
    });

    const topWebinars = webinars
        .slice()
        .sort((a, b) => b.registered - a.registered)
        .slice(0, 4);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % topWebinars.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [topWebinars.length]);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newsletterEmail.trim())) {
            setNewsletterStatus("error");
            return;
        }
        setNewsletterStatus("success");
        setNewsletterEmail("");
    };

    const cardsRef = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(({ target, isIntersecting }) => {
                    if (isIntersecting) {
                        target.classList.add("fade-in");
                        observer.unobserve(target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        cardsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [filteredWebinars]);

    const handleViewDetails = (id) => {
        console.log(`Viewing details for webinar ID: ${id}`);
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 text-white overflow-hidden">
            {/* Hero Carousel */}
            <div
                className="relative w-full h-screen overflow-hidden"
                aria-label="Top webinars carousel"
            >
                {topWebinars.map((webinar, index) => {
                    const {
                        days,
                        hours,
                        minutes,
                        seconds,
                        isEnded,
                    } = useCountdown(webinar.date);

                    return (
                        <div
                            key={webinar.id}
                            className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out transform ${index === activeIndex
                                    ? "translate-x-0 opacity-100 scale-100 z-10"
                                    : "translate-x-full opacity-0 scale-95 z-0"
                                }`}
                            role="group"
                            aria-hidden={index !== activeIndex}
                        >
                            <img
                                src={webinar.image}
                                alt={webinar.title}
                                className="w-full h-full object-cover"
                                style={{ filter: "blur(4px)" }}
                            />

                            <div className="absolute bottom-8 right-8 max-w-xl text-white text-right drop-shadow-lg">
                                <h2 className="text-3xl md:text-4xl font-bold">{webinar.title}</h2>
                                <div className="flex items-center justify-end gap-3 mt-2">
                                    <User className="w-5 h-5" />
                                    <span className="text-md">{webinar.speaker}</span>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-1">
                                    <CalendarDays className="w-5 h-5" />
                                    <span className="text-md">{new Date(webinar.date).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-1">
                                    <User className="w-5 h-5" />
                                    <span className="text-md">{webinar.registered} Registered</span>
                                </div>

                                <div className="mt-4 py-2 px-5 text-sm font-semibold bg-opacity-50 px-3 py-1 rounded inline-block">
                                    {isEnded ? (
                                        <span>Webinar Started</span>
                                    ) : (
                                        <span>
                                            Starts in: {days}d {hours}h {minutes}m {seconds}s
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleViewDetails(webinar.id)}
                                    aria-label={`View details for webinar titled ${webinar.title}`}
                                    className="mt-4 py-2 px-5 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold cursor-pointer transition focus:outline focus:outline-2 focus:outline-blue-500"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <main
                className="max-w-7xl mx-auto px-4 py-16 text-black bg-white rounded-lg"
                role="main"
            >
                <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    🌟 Most Awaited Webinars
                </h2>

                <section
                    className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
                    aria-label="Search and filter webinars"
                >
                    <input
                        type="text"
                        placeholder="Search by title or speaker..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-1/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        aria-label="Search webinars by title or speaker"
                    />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full sm:w-1/5 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        aria-label="Filter webinars by date"
                    >
                        <option value="all">All Webinars</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full sm:w-1/4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        aria-label="Filter webinars by category"
                    >
                        <option value="all">All Categories</option>
                        {allCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </section>

                <section
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    aria-label="Filtered webinars"
                >
                    {filteredWebinars.length > 0 ? (
                        filteredWebinars.map((webinar, idx) => {
                            const {
                                days,
                                hours,
                                minutes,
                                seconds,
                                isEnded,
                            } = useCountdown(webinar.date);

                            return (
                                <article
                                    key={webinar.id}
                                    className="relative rounded-2xl overflow-hidden cursor-pointer h-56 group opacity-0 translate-y-8 transition duration-700 ease-out fade-in"
                                    onClick={() => handleViewDetails(webinar.id)}
                                    tabIndex={0}
                                    ref={(el) => (cardsRef.current[idx] = el)}
                                    aria-label={`Webinar titled ${webinar.title} by speaker ${webinar.speaker}, starting on ${new Date(
                                        webinar.date
                                    ).toLocaleDateString()}`}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleViewDetails(webinar.id);
                                    }}
                                >
                                    <img
                                        src={webinar.image}
                                        alt={webinar.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        style={{ filter: "blur(2px)" }}
                                    />

                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <h3 className="text-lg font-bold drop-shadow-lg truncate">
                                            {webinar.title}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-1 drop-shadow-md text-xs">
                                            <User className="w-3 h-3" />
                                            <span>{webinar.speaker}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1 drop-shadow-md text-xs">
                                            <CalendarDays className="w-3 h-3" />
                                            <span>{new Date(webinar.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1 drop-shadow-md text-xs">
                                            <User className="w-3 h-3" />
                                            <span>{webinar.registered} Registered</span>
                                        </div>

                                        <div className="mt-1 text-xs font-semibold bg-blur bg-opacity-50 px-2 py-1 rounded inline-block">
                                            {isEnded ? (
                                                <span>Started</span>
                                            ) : (
                                                <span>
                                                    Starts in: {days}d {hours}h {minutes}m {seconds}s
                                                </span>
                                            )}
                                        </div>

                                        {/* Categories Tags */}
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {webinar.categories.map((cat) => (
                                                <span
                                                    key={cat}
                                                    className="text-xs bg-blue-600 bg-opacity-80 rounded px-2 py-0.5"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>

                                        <button
                                            className="mt-2 py-1 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-xs transition focus:outline focus:outline-2 focus:outline-blue-500 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewDetails(webinar.id);
                                            }}
                                            aria-label={`View details for webinar titled ${webinar.title}`}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-gray-700">
                            No webinars match your search/filter.
                        </p>
                    )}
                </section>

                <section
                    className="mt-20 bg-gray-100 rounded-lg p-8 text-black"
                    aria-label="Attendee testimonials"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-center">What Attendees Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map(({ id, quote, name, rating }) => (
                            <blockquote
                                key={id}
                                className="bg-white rounded-lg p-6 shadow-md flex flex-col"
                                tabIndex={0}
                                aria-label={`Testimonial from ${name} with rating ${rating} stars`}
                            >
                                <p className="mb-4 italic">&quot;{quote}&quot;</p>
                                <footer className="mt-auto flex items-center justify-between">
                                    <span className="font-semibold">{name}</span>
                                    <div className="flex text-yellow-500">
                                        {Array.from({ length: rating }).map((_, i) => (
                                            <Star key={i} className="w-5 h-5" aria-hidden="true" />
                                        ))}
                                        {rating < 5 &&
                                            Array.from({ length: 5 - rating }).map((_, i) => (
                                                <Star
                                                    key={i + 10}
                                                    className="w-5 h-5 text-gray-300"
                                                    aria-hidden="true"
                                                />
                                            ))}
                                    </div>
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </section>

                <section
                    className="mt-12 bg-blue-600 rounded-lg p-6 text-white max-w-xl mx-auto"
                    aria-label="Newsletter subscription"
                >
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Subscribe to our Newsletter
                    </h3>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your email address"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            required
                            className="flex-grow px-4 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-white text-black bg-white"
                            aria-required="true"
                            aria-invalid={newsletterStatus === "error"}
                        />
                        <button
                            type="submit"
                            className="bg-white text-blue-600 font-semibold rounded-md px-6 py-2 hover:bg-gray-100 transition focus:outline focus:outline-2 focus:outline-white"
                            aria-label="Subscribe to newsletter"
                        >
                            Subscribe
                        </button>
                    </form>
                    {newsletterStatus === "success" && (
                        <p
                            className="mt-3 text-center text-green-300"
                            role="alert"
                            tabIndex={-1}
                        >
                            Thanks for subscribing!
                        </p>
                    )}
                    {newsletterStatus === "error" && (
                        <p
                            className="mt-3 text-center text-red-400"
                            role="alert"
                            tabIndex={-1}
                        >
                            Please enter a valid email.
                        </p>
                    )}
                </section>
            </main>

            <style>
                {
                `
                .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .group:hover img {
                transform: scale(1.05);
                transition: transform 0.5s ease;
                }
            `
      }
      </style>
        </div>
    );
};

export default WebinarsPage;