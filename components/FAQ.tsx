"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

const FAQ_DATA = [
    {
        question: "What is Alan?",
        answer:
            "Alan is the control plane for teams shipping with coding agents. It coordinates Codex, Cursor, Claude Code, browser testing, CI/CD, repositories, and deployment workflows through a single context graph so teams can plan, build, review, test, and ship without juggling tools.",
    },
    {
        question: "Which coding agents does Alan support?",
        answer:
            "Alan works with coding agents and engineering automation such as Codex, Cursor, Claude Code, browser-automation agents, CI agents, and custom internal tools. Generic coding agents are connected as executors, not treated as the workflow system itself.",
    },
    {
        question: "How is Alan different from a generic coding agent?",
        answer:
            "Alan is not a generic coding agent. It is an SDLC platform for coordinating coding agents, tasks, repositories, tests, CI/CD, releases, and the context graph behind them. Tasks get routed to the right executor, results flow back into shared memory, and outcomes stay visible to the whole team.",
    },
    {
        question:
            "Can humans and coding agents collaborate on the same sprint board?",
        answer:
            "Yes. Alan treats humans and coding agents as first-class contributors to the same software delivery workflow. Cards on the sprint board can be assigned to people or specific agents, with live status, progress, and human checkpoints when work needs review.",
    },
    {
        question: "How does Alan retain context across tools?",
        answer:
            "Every customer call, PRD, task, comment, code change, test result, and agent run is connected through a shared context graph. When a new task starts, agents and humans inherit the relevant history automatically, with no re-onboarding required.",
    },
    {
        question: "Is Alan secure for engineering teams?",
        answer:
            "Alan runs through your existing source control and identity providers. Agents operate inside scoped permissions, every action is auditable, and human checkpoints can be required before high-impact changes.",
    },
    {
        question: "How do I get started with Alan?",
        answer:
            "Book a demo from tryalan.ai. We typically scope a pilot around one repository, one agent, and one sprint, then expand from there.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    const toggleFAQ = (index: number) => {
        setOpenIndex((current) =>
            current === index ? null : index
        );
    };

    return (
        <section className="relative w-full overflow-hidden bg-[#111111] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-[1080px]
                    overflow-hidden
                    rounded-[3rem]
                    bg-[#141414]
                    px-5
                    py-16
                    shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                    sm:px-10
                    sm:py-20
                    md:rounded-[3.5rem]
                    md:px-16
                    lg:px-20
                    lg:py-24
                "
            >
                <div className="flex flex-col items-center text-center">
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.03]
                            px-3
                            py-1.5
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.18em]
                            text-white/45
                        "
                    >
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        <span>FAQ</span>
                    </div>

                    <h2
                        className="
                            mt-7
                            font-[var(--font-instrument-serif)]
                            text-5xl
                            font-normal
                            tracking-tight
                            text-white
                            sm:text-6xl
                            md:text-7xl
                        "
                    >
                        Your Questions <br />Answered
                    </h2>
                </div>

                <div className="mx-auto mt-14 max-w-[780px]">
                    <div className="space-y-2">
                        {FAQ_DATA.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={item.question}
                                    className={`
                                        overflow-hidden
                                        rounded-[1.75rem]
                                        transition-all
                                        duration-500
                                        ${isOpen
                                            ? "bg-white/[0.06] shadow-[0_8px_35px_rgba(0,0,0,0.3)]"
                                            : "bg-white/[0.02] hover:bg-white/[0.045]"
                                        }
                                    `}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleFAQ(index)
                                        }
                                        aria-expanded={isOpen}
                                        className="group flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6 sm:py-6"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            <span
                                                className="
                                                    flex
                                                    h-6
                                                    w-6
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-white/[0.06]
                                                    font-mono
                                                    text-[10px]
                                                    text-white/60
                                                "
                                            >
                                                {index + 1}
                                            </span>

                                            <span
                                                className="
                                                    text-sm
                                                    font-medium
                                                    tracking-tight
                                                    text-white/90
                                                    sm:text-base
                                                "
                                            >
                                                {item.question}
                                            </span>
                                        </div>

                                        <span
                                            className={`
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                transition-all
                                                duration-500
                                                ${isOpen
                                                    ? "rotate-45 border-white/10 bg-white text-black"
                                                    : "border-transparent bg-white text-black"
                                                }
                                            `}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </span>
                                    </button>

                                    <div
                                        className={`
                                            grid
                                            transition-[grid-template-rows,opacity]
                                            duration-500
                                            ease-[cubic-bezier(0.22,1,0.36,1)]
                                            ${isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }
                                        `}
                                    >
                                        <div className="min-h-0 overflow-hidden">
                                            <div className="px-14 pb-7 pr-12 sm:px-16 sm:pb-8">
                                                <p className="max-w-[580px] whitespace-pre-line text-xs leading-[1.75] text-white/50 sm:text-sm">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {isOpen && (
                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                hidden
                                            "
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}