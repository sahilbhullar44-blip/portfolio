import { Server, Cpu, Smartphone, Terminal } from "lucide-react";

export const systemData = {
    root: [
        { id: "fullstack", name: "Fullstack_Dev", type: "folder", icon: Server },
        { id: "ai_ml", name: "AI_Intelligence", type: "folder", icon: Cpu },
        { id: "mobile", name: "Mobile_Apps", type: "folder", icon: Smartphone },
        { id: "tools", name: "Sys_Utils", type: "folder", icon: Terminal },
    ],

    files: {
        // ---------------- FULLSTACK PROJECTS ----------------
        fullstack: [
            {
                name: "tickmark.io",
                size: "7.3 MB",
                date: "2024-11-15",
                desc: "Multi-tenant management platform with RBAC permissions, team/task modules and realtime updates.",
                tech: [
                    "React",
                    "Node.js",
                    "MongoDB",
                    "Express",
                    "Socket.io",
                    "TypeScript",
                    "RBAC",
                    "Cron",
                    "Aggregation Pipelines",
                ],
                status: "Production",
                color: "text-blue-400",
            },

            {
                name: "amritsar.com",
                size: "5.5 MB",
                date: "2024-09-30",
                desc: "Live streaming platform with YouTube integration, realtime chat and content moderation.",
                tech: ["Next.js", "Express", "TypeScript", "Socket.io"],
                status: "Production",
                color: "text-red-400",
            },

            {
                name: "sofa_studio",
                size: "3.6 MB",
                date: "2024-10-15",
                desc: "Admin dashboard for managing sofa designs with TanStack Query integration.",
                tech: ["Next.js", "Node.js", "TanStack Query", "TypeScript"],
                status: "Stable",
                color: "text-purple-400",
            },

            {
                name: "shivshaktifastfood",
                size: "4.1 MB",
                date: "2024-08-10",
                desc: "Food ordering web app with product management and live order tracking.",
                tech: ["Next.js", "MongoDB"],
                status: "Production",
                color: "text-orange-400",
            },

            {
                name: "super_choice_services",
                size: "3.9 MB",
                date: "2024-07-20",
                desc: "Multilingual appointment booking platform with automated notifications.",
                tech: ["Next.js", "MongoDB", "i18n"],
                status: "Active",
                color: "text-green-400",
            },

            {
                name: "best_micro_garden",
                size: "3.4 MB",
                date: "2024-06-15",
                desc: "Service management system with advanced MongoDB filtering and category management.",
                tech: ["React", "MongoDB", "Aggregation Pipelines"],
                status: "Active",
                color: "text-yellow-400",
            },

            {
                name: "space_project",
                size: "2.7 MB",
                date: "2024-05-20",
                desc: "Interactive mission timeline visualization dashboard with animations.",
                tech: ["React", "CSS Animations", "Component Architecture"],
                status: "Stable",
                color: "text-indigo-400",
            },
        ],

        // ---------------- AI / ML ----------------
        ai_ml: [
            {
                name: "medfeed.ai",
                size: "600 MB",
                date: "2024-09-12",
                desc: "AI-powered ETL system that converts patient audio feedback into actionable tasks using speech-to-text and NLP.",
                tech: ["Python", "ChatGPT API", "Whisper", "FastAPI"],
                status: "Active",
                color: "text-pink-400",
            },
        ],

        // ---------------- MOBILE ----------------
        mobile: [
            {
                name: "memeSake",
                size: "38 MB",
                date: "2024-06-09",
                desc: "React Native mobile app for uploading, managing and browsing meme content with optimized performance.",
                tech: ["React Native"],
                status: "Beta",
                color: "text-lime-400",
            },
        ],

        // ---------------- TOOLS ----------------
        tools: [
            {
                name: "mongodb_etl_pipeline.js",
                size: "18 KB",
                date: "2024-11-10",
                desc: "High-performance MongoDB ETL pipeline for processing patient feedback with sentiment analysis and task generation.",
                tech: ["MongoDB Aggregation", "Node.js", "TypeScript", "ETL"],
                status: "Production",
                color: "text-emerald-400",
            },

            {
                name: "swagger_documentation.yaml",
                size: "15 KB",
                date: "2024-11-10",
                desc: "OpenAPI documentation for Tickmark.io backend APIs covering authentication, scheduling and team management.",
                tech: ["OpenAPI", "Swagger", "YAML"],
                status: "Documentation",
                color: "text-sky-400",
            },

            {
                name: "agenda_cron_service.js",
                size: "7 KB",
                date: "2024-11-15",
                desc: "Timezone-aware cron service for managing meeting reminders and schedule expiration in Tickmark's Agenda module.",
                tech: ["Node.js", "Cron", "MongoDB"],
                status: "Utility",
                color: "text-gray-300",
            },
        ],
    },
};
