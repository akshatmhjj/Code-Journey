<%@ page session="true" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String userEmail = (String) session.getAttribute("userEmail");
    String userName = (String) session.getAttribute("userName");

    if (userEmail == null && userName == null) {
        // If user is not logged in, redirect to index.jsp with loginFirst flag
        response.sendRedirect("index.jsp?loginFirst=true");
        return; // Ensure no further code is executed
    } else {
        request.setAttribute("userName", userName);
    }

    // Disable caching
    response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/project.css">
    <title>HTML</title>
    <link rel="icon" type="image/png" href="./Images/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="./Images/favicon.svg" />
    <link rel="shortcut icon" href="./Images/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="./Images/apple-touch-icon.png" />
    <link rel="manifest" href="./Images/site.webmanifest" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom transitions for the mobile menu */
        #mobile-menu {
            transform: translateX(100%); /* Hidden initially */
            transition: transform 0.3s ease-in-out;
        }

        #mobile-menu.open {
            transform: translateX(0); /* Slide into view */
        }

        /* Transition for the product dropdown */
        #mobile-product-dropdown {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
        }

        #mobile-product-dropdown.open {
            max-height: 300px; /* Adjust based on content */
        }

        #carousel {
            transition: transform 0.5s ease-in-out;
        }

        .sidebar {
            width: 45vw;
            max-width: 500px;
            height: 100vh;
            overflow-y: auto;
            transition: transform 0.3s ease-in-out;
        }
        .sidebar-hidden {
            transform: translateX(100%);
        }
        body.sidebar-open {
            overflow: hidden;
        }
        .rotate-180 {
            transform: rotate(180deg);
        }
        /* Smooth transition for collapsible sections */
        .collapsible-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
        }
        .collapsible-content.expanded {
            max-height: 100px; /* Adjust according to content size */
            padding-top: 8px;
            padding-bottom: 8px;
        }
        .line-through {
        text-decoration: line-through;
        color: #888; /* Lighten color for completed tasks */
        }

        .progress-option {
            cursor: pointer;
        }

        .progress-circle {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 9999px;
            text-align: center;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Styles for checked states with color persistence */
        .progress-option input[type="radio"]:checked + .progress-circle {
            background-color: var(--color-selected);
            color: white;
            font-weight: bold;
        }

        /* Set specific colors for each progress state */
        .progress-option:nth-child(1) input[type="radio"]:checked + .progress-circle {
            background-color: #ef4444; /* Red for Not Started */
        }

        .progress-option:nth-child(2) input[type="radio"]:checked + .progress-circle {
            background-color: #f59e0b; /* Yellow for Ongoing */
        }

        .progress-option:nth-child(3) input[type="radio"]:checked + .progress-circle {
            background-color: #10b981; /* Green for Completed */
        }
    </style>
</head>
<body class="bg-[url('https://tailframes.com/images/squares-bg.webp')] bg-contain bg-fixed bg-center bg-repeat">

<!-- Header -->
<header class="bg-slate-900 shadow-lg bg-gradient-to-r from-slate-500 to-slate-800">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
        <a href="dashboard.jsp" class="-m-1.5 p-1.5">
        <img class="h-12 w-auto transition-all hover:scale-125 rounded-2xl" src="./Images/CJ.jpg" alt="Your Company">
        </a>
    </div>
    <div class="flex lg:hidden">
        <button id="mobile-menu-open" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
        <span class="sr-only">Open main menu</span>
        <svg class="h-7 w-7 font-bold" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-12">
        <div class="relative">
        <button id="product-button" type="button" class="flex items-center gap-x-1 text-md font-bold leading-6 text-white hover:text-blue-400 transition-all hover:scale-110">
            Tech Stack
            <svg class="h-5 w-5 flex-none text-white hover:text-blue-400 transition-all hover:scale-110" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
        </button>
        <div id="product-menu" class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-xl bg-gray-100 shadow-lg ring-1 ring-gray-900/5 opacity-0 translate-y-1 transition-all duration-200 ease-out pointer-events-none">
            <div class="p-4">
                <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-300">
                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <svg class="h-6 w-6 text-gray-600 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>
                    </div>
                    <div class="flex-auto">
                    <a href="html.jsp" class="block font-semibold text-black">
                        HTML (HyperText Markup Language)
                        <span class="absolute inset-0"></span>
                    </a>
                    <p class="mt-1 text-gray-900">Structure web pages with content</p>
                </div>
            </div>
            <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-300">
                <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg class="h-6 w-6 text-gray-600 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                </div>
                <div class="flex-auto">
                <a href="css.jsp" class="block font-semibold text-black">
                    CSS (Cascading Style Sheets)
                    <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-900">Style and design web page elements</p>
                </div>
            </div>
            
            <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-300">
                <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <svg class="h-6 w-6 text-gray-600 group-hover:text-yellow-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                    </svg>
                </div>
                <div class="flex-auto">
                <a href="js.jsp" class="block font-semibold text-black">
                    JavaScript (JS)
                    <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-900">Store, manage, and retrieve data</p>
                </div>
            </div>
            <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-300">
                <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg class="h-6 w-6 text-gray-600 group-hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                </svg>
                </div>
                <div class="flex-auto">
                <a href="db.jsp" class="block font-semibold text-black">
                    Databases (DB)
                    <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-900">Store, manage, and retrieve data</p>
                </div>
            </div>
            </div>
        </div>
        </div>

        <a href="roadmap.jsp" class="text-md font-bold leading-6 text-white hover:text-blue-400 transition-all hover:scale-110">Roadmap</a>
        <a href="marketplace.jsp" class="text-md font-bold leading-6 text-white hover:text-blue-400 transition-all hover:scale-110">Marketplace</a>
        <a href="company.jsp" class="text-md font-bold leading-6 text-white hover:text-blue-400 transition-all hover:scale-110">Company</a>
    </div>

    <div class=" hidden lg:flex lg:flex-1 lg:justify-end">
        <button id="profileButton" class="top-6 right-6 rounded-full p-3 cursor-pointer font-bold leading-6  hover:text-blue-400 transition-all hover:scale-110  ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 hover:text-blue-400 transition-all w-7 text-white" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14c-5 0-8.5 3-8.5 4.5V21h17v-2.5c0-1.5-3.5-4.5-8.5-4.5z" />
            </svg>
        </button>
    </div>

    <!-- Sidebar Overlay for Blurring Background -->
    <div id="sidebarOverlay" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md hidden z-40"></div>
    
    <!-- Sidebar Content (Opening from Right) -->
    <div id="sidebar" class="sidebar sidebar-hidden fixed inset-y-0 right-0 bg-white shadow-lg rounded-lg z-50 p-6">
        <!-- Sidebar Header with Close Button -->
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
            <button id="closeSidebarButton" class="text-gray-800 hover:text-gray-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 011.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12.001l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    
         <!-- Personalized Greeting with Date -->
<div class="text-center mb-8">
    <h2 id="greeting" class="text-3xl font-semibold text-gray-800">
        Hello, ${sessionScope.userName != null ? sessionScope.userName : 'Guest'}!
    </h2>
    <p class="text-gray-600" id="currentDate"></p>
</div>
    
        <!-- Manual Progress Tracker for Course Topics -->
        <div class="mb-8 space-y-6">
            <h3 class="text-lg font-bold text-black">Course Progress</h3>
            
            <!-- HTML Progress -->
            <div class="flex items-center bg-gray-800 p-4 rounded-lg mb-3 shadow-sm">
                <svg class="h-6 w-6 mr-3 text-red-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
                <span class="flex-1 font-semibold text-white">HTML</span>
                <div class="flex space-x-2 ml-4">
                    <label class="progress-option">
                        <input type="radio" name="html-progress" value="not_started" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-red-500 hover:text-white">Pending</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="html-progress" value="in_progress" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-yellow-500 hover:text-white">Ongoing</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="html-progress" value="completed" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-green-500 hover:text-white">Completed</span>
                    </label>
                </div>
            </div>
    
            <!-- CSS Progress -->
            <div class="flex items-center bg-gray-800 p-4 rounded-lg mb-3 shadow-sm">
                <svg class="h-6 w-6 mr-3 text-blue-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
                <span class="flex-1 font-semibold text-white">CSS</span>
                <div class="flex space-x-2 ml-4">
                    <label class="progress-option">
                        <input type="radio" name="css-progress" value="not_started" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-red-500 hover:text-white">Pending</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="css-progress" value="in_progress" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-yellow-500 hover:text-white">Ongoing</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="css-progress" value="completed" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-green-500 hover:text-white">Completed</span>
                    </label>
                </div>
            </div>
    
            <!-- JavaScript Progress -->
            <div class="flex items-center bg-gray-800 p-4 rounded-lg mb-3 shadow-sm">
                <svg class="h-6 w-6 mr-3 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
                <span class="flex-1 font-semibold text-white">JavaScript</span>
                <div class="flex space-x-2 ml-4">
                    <label class="progress-option">
                        <input type="radio" name="js-progress" value="not_started" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-red-500 hover:text-white">Pending</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="js-progress" value="in_progress" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-yellow-500 hover:text-white">Ongoing</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="js-progress" value="completed" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-green-500 hover:text-white">Completed</span>
                    </label>
                </div>
            </div>
    
            <!-- Database Progress -->
            <div class="flex items-center bg-gray-800 p-4 rounded-lg mb-3 shadow-sm">
                <svg class="h-6 w-6 mr-3 text-green-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
                <span class="flex-1 font-semibold text-white">Database</span>
                <div class="flex space-x-2 ml-4">
                    <label class="progress-option">
                        <input type="radio" name="db-progress" value="not_started" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-red-500 hover:text-white">Pending</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="db-progress" value="in_progress" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-yellow-500 hover:text-white">Ongoing</span>
                    </label>
                    <label class="progress-option">
                        <input type="radio" name="db-progress" value="completed" class="hidden" />
                        <span class="progress-circle bg-gray-600 text-gray-300 hover:bg-green-500 hover:text-white">Completed</span>
                    </label>
                </div>
            </div>
        </div>
    
        <!-- Task List / To-Do Section -->
        <div class="bg-gray-100 p-4 rounded-lg mb-8">
            <h3 class="text-lg font-bold text-black">Today's Tasks</h3>
            <ul class="mt-4 space-y-2">
                <li>
                    <input type="checkbox" class="mr-2" onclick="toggleTask(this)">
                    <span class="text-gray-700 todo-text">Complete HTML tutorial</span>
                </li>
                <li>
                    <input type="checkbox" class="mr-2" onclick="toggleTask(this)">
                    <span class="text-gray-700 todo-text">Practice CSS flexbox</span>
                </li>
                <li>
                    <input type="checkbox" class="mr-2" onclick="toggleTask(this)">
                    <span class="text-gray-700 todo-text">Build a small JS project</span>
                </li>
            </ul>
        </div>
    
        <!-- Progress Badges / Achievements -->
        <div class="bg-gray-100 p-4 rounded-lg shadow-md mb-8">
            <h3 class="text-lg font-bold text-black">Achievements</h3>
            <div class="flex flex-wrap gap-2 mt-4">
                <span class="px-3 py-2 bg-yellow-400 rounded-full text-xs font-semibold text-gray-800">HTML Pro</span>
                <span class="px-3 py-2 bg-green-400 rounded-full text-xs font-semibold text-gray-800">CSS Master</span>
                <span class="px-3 py-2 bg-red-400 rounded-full text-xs font-semibold text-gray-800">JavaScript Novice</span>
            </div>
        </div>
    
        <!-- Log Out Button -->
        <button id="logoutButton" class="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition mb-4">
            Log Out
        </button>
    </div>    

    </nav>
    
    <!-- Mobile menu with slide-in transition -->
    <div id="mobile-menu" class="lg:hidden fixed inset-0 z-10 w-full bg-gray-400 px-6 py-6 transform translate-x-full transition-transform duration-300 ease-in-out">
        <div class="flex items-center justify-between">
        <a href="index.jsp" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto transition-all hover:scale-125 rounded-2xl" src="Images/CJ.jpg" alt="Your Company">
        </a>
        <button id="mobile-menu-close" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>
        <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
            <div class="-mx-3">
                <button id="mobile-product-button" type="button" class="flex w-full items-center rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition-all">
                    <span class="mr-2">Tech Stack</span>
                    <svg class="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </button>

                <!-- Product dropdown in mobile menu -->
                <div id="mobile-product-dropdown" class="ml-6 space-y-2">
                    <a href="html.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-orange-500 hover:px-1">HTML</a>
                    <a href="css.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-blue-500 hover:px-1">CSS</a>
                    <a href="js.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-yellow-500 hover:px-1">JavaScript</a>
                    <a href="db.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-green-500 hover:px-1">Databases</a>
                </div>
            </div>
            <a href="roadmap.jsp" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition-all ">Roadmap</a>
            <a href="marketplace.jsp" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition-all ">Marketplace</a>
            <a href="company.jsp" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition-all ">Company</a>
            </div>
            <div class="py-6">
                <a id="loginLink" class="cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition-all">
                    Log in <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
        </div>
        </div>
    </div>
</header>
<!-- Header Ends-->

<!-- Hero Section -->
<section id="herosection" class="flex w-full h-full items-center justify-center ">
    <div class="flex max-w-screen-xl flex-col items-center justify-center gap-6 py-20 px-3 sm:px-8 lg:px-16 xl:px-32">
        <svg width="90px" height="90px" viewBox="-52.5 0 361 361" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <g>
                <path d="M255.554813,70.7657143 L232.31367,331.125451 L127.843868,360.087912 L23.6617143,331.166242 L0.445186813,70.7657143 L255.554813,70.7657143 L255.554813,70.7657143 Z" fill="#E44D26">
        
        </path>
                <path d="M128,337.950242 L212.416703,314.546637 L232.277802,92.0573187 L128,92.0573187 L128,337.950242 L128,337.950242 Z" fill="#F16529">
        
        </path>
                <path d="M82.8202198,155.932132 L128,155.932132 L128,123.994725 L47.917011,123.994725 L48.6814945,132.562989 L56.530989,220.572835 L128,220.572835 L128,188.636132 L85.7389011,188.636132 L82.8202198,155.932132 L82.8202198,155.932132 Z" fill="#EBEBEB">
        
        </path>
                <path d="M90.0177582,236.54189 L57.957978,236.54189 L62.4323516,286.687648 L127.853011,304.848879 L128,304.808088 L128,271.580132 L127.860044,271.617407 L92.2915165,262.013187 L90.0177582,236.54189 L90.0177582,236.54189 Z" fill="#EBEBEB">
        
        </path>
                <path d="M24.1807473,0 L40.4107253,0 L40.4107253,16.0351648 L55.2573187,16.0351648 L55.2573187,0 L71.488,0 L71.488,48.5584176 L55.258022,48.5584176 L55.258022,32.2981978 L40.4114286,32.2981978 L40.4114286,48.5584176 L24.1814505,48.5584176 L24.1814505,0 L24.1807473,0 L24.1807473,0 Z" fill="#000000">
        
        </path>
                <path d="M92.8309451,16.1026813 L78.5427692,16.1026813 L78.5427692,0 L123.356835,0 L123.356835,16.1026813 L109.06233,16.1026813 L109.06233,48.5584176 L92.8316484,48.5584176 L92.8316484,16.1026813 L92.8309451,16.1026813 L92.8309451,16.1026813 Z" fill="#000000">
        
        </path>
                <path d="M130.469275,0 L147.392703,0 L157.802901,17.061978 L168.202549,0 L185.132308,0 L185.132308,48.5584176 L168.969143,48.5584176 L168.969143,24.4901978 L157.802901,41.7554286 L157.523692,41.7554286 L146.349714,24.4901978 L146.349714,48.5584176 L130.469275,48.5584176 L130.469275,0 L130.469275,0 Z" fill="#000000">
        
        </path>
                <path d="M193.20967,0 L209.444571,0 L209.444571,32.5077802 L232.268659,32.5077802 L232.268659,48.5584176 L193.20967,48.5584176 L193.20967,0 L193.20967,0 Z" fill="#000000">
        
        </path>
                <path d="M127.889582,220.572835 L167.216527,220.572835 L163.509451,261.992791 L127.889582,271.606857 L127.889582,304.833407 L193.362286,286.687648 L193.842637,281.291956 L201.347516,197.212132 L202.126769,188.636132 L127.889582,188.636132 L127.889582,220.572835 L127.889582,220.572835 Z" fill="#FFFFFF">
        
        </path>
                <path d="M127.889582,155.854066 L127.889582,155.932132 L205.032791,155.932132 L205.673495,148.753582 L207.128615,132.562989 L207.892396,123.994725 L127.889582,123.994725 L127.889582,155.854066 L127.889582,155.854066 Z" fill="#FFFFFF">
        
        </path>
            </g>
        </svg>
        <div class="flex flex-1 flex-col items-center gap-6 text-center">
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
                <span class="inline-flex items-center justify-center rounded-[64px] border text-center font-semibold transition-all duration-300 ease-in-out h-7 px-3 py-1 text-sm border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-400 hover:text-white">
                    HTML v5
                </span>
            </a>            
            <div class="flex max-w-lg flex-col gap-6">
                <h3 class="text-4xl font-semibold text-slate-950 md:text-6xl">HTML: HyperText Markup Language</h3>
                <p class="text-lg font-normal leading-7 text-slate-500">The only place where divs get along, and margins keep their distance.</p>
            </div>
        </div>
        <div class="flex gap-4 justify-center">
            <a href="#main">
                <button type="button" aria-disabled="false"
                class="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out bg-blue-500 stroke-white px-5 text-white hover:bg-orange-600 h-[42px] min-w-[42px] gap-200">
                Dive In
            </button>
            </a>
        </div>
    </div>
</section>
<!-- Hero Section Ends -->

<!-- First Section -->
<div class="w-[90%] mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-r from-blue-50 to-blue-100 mb-10 h-[550px] bg-no-repeat bg-center bg-cover relative"
    style="background-image: url('./Images/HTML.jpg');">

        <!-- Left Heading Section -->
        <div class="w-full md:w-1/3 flex flex-col justify-center items-center text-center p-8 z-10 backdrop-blur-md bg-opacity-5 rounded">
            <h2 class="text-4xl font-extrabold text-gray-100 mb-4 ">
                The Foundation of Web Development
            </h2>
            <p class="text-white font-semibold text-base leading-7">
                Unleash your imagination and explore a world of endless possibilities with HTML. Learn the essential concepts to create, structure, and style your web pages effectively.
            </p>
            <a href="#herosection">
                <button type="button" aria-disabled="false"
                class="mt-10 group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out bg-blue-500 stroke-white px-5 text-white hover:bg-orange-600 h-[42px] min-w-[42px]">
                    Get Started
                </button>
            </a>
        </div>

        <!-- Right Carousel Section -->
        <div class="relative w-full md:w-2/3 overflow-hidden rounded-lg shadow-lg h-full flex items-center z-10">
            <!-- <div class="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-md rounded-lg"></div> -->

            <!-- Carousel Wrapper -->
            <div id="carousel" class="flex h-full w-full relative z-10" style="transform: translateX(0);">

                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg ">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">HTML Structure</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">HTML (HyperText Markup Language) defines the structure of a webpage. It serves as the foundation for organizing content and layout.</p>
                    <div class="border-t-2 border-purple-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Define headers, paragraphs, and sections.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Organize content with semantic tags.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Utilize HTML5 elements for a modern layout.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Ensure clean and organized code structure.</li>
                    </ul>
                </div>
                
                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg shadow-lg">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">HTML Elements and Attributes</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">HTML elements and attributes are the building blocks of webpages, helping to define and enhance content.</p>
                    <div class="border-t-2 border-purple-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Understand essential HTML tags.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Use attributes to customize elements.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Enhance accessibility with alt attributes for images.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Explore metadata with the meta tag.</li>
                    </ul>
                </div>
                
                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg shadow-lg">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">Forms and User Input</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">Forms in HTML allow users to interact with websites by submitting information, making it a powerful tool for data collection.</p>
                    <div class="border-t-2 border-purple-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Create various input types for user data.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Implement form validation and accessibility.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Use labels for better user experience.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Process data with action and method attributes.</li>
                    </ul>
                </div>
                
                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg shadow-lg">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">Media Integration</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">HTML allows you to embed images, videos, and audio to create a rich user experience, making web content more engaging.</p>
                    <div class="border-t-2 border-purple-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Embed images with the img tag.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Use the video tag for multimedia content.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Add audio with the audio tag.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Optimize media for faster loading.</li>
                    </ul>
                </div>
            </div>

            <!-- Navigation Dots -->
            <div class="absolute bottom-8 w-full flex justify-center space-x-3 z-20">
                <button onclick="setActiveSlide(0)" class="w-3 h-3 rounded-full bg-gray-300 dot"></button>
                <button onclick="setActiveSlide(1)" class="w-3 h-3 rounded-full bg-gray-300 dot"></button>
                <button onclick="setActiveSlide(2)" class="w-3 h-3 rounded-full bg-gray-300 dot"></button>
                <button onclick="setActiveSlide(3)" class="w-3 h-3 rounded-full bg-gray-300 dot"></button>
            </div>
        </div>
    </div>
<!-- First Section Ends -->

<!-- Main Section -->
<div id="main" class="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg overflow-hidden mt-32 mb-32">
    <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-blue-600 mb-4 mt-12">Getting Started with HTML</h1>
        <p class="text-gray-600 text-lg">A complete guide to start your journey in web development with HTML.</p>
    </div>

    <!-- Introduction to HTML -->
    <div class="flex flex-col md:flex-row mb-12">
        <div class="w-full md:w-1/2 mb-6 md:mb-0">
            <img src="./Images/HTML1.jpg" alt="Introduction to HTML" class="rounded-lg shadow-md">
        </div>
        <div class="w-full md:w-1/2 md:pl-8 flex flex-col justify-center">
            <h2 class="text-2xl font-bold text-orange-400 mb-4">What is HTML?</h2>
            <p class="text-gray-700 text-base leading-relaxed">HTML (HyperText Markup Language) is the standard language for creating web pages. It provides the basic structure of a webpage, allowing you to format content, add images, links, and multimedia.</p>
            <p class="text-gray-700 text-base leading-relaxed mt-4">HTML is essential for anyone looking to start their journey in web development, as it’s the foundation upon which all websites are built.</p>
        </div>
    </div>

    <!-- Why Learn HTML -->
    <div class="bg-blue-50 rounded-lg p-8 mt-20 mb-20">
        <h2 class="text-2xl font-bold text-orange-400 text-center mb-10">Why Learn HTML?</h2>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="flex items-start mb-7">
                <div class="bg-blue-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-globe text-sm"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-blue-700">Essential for Web Development</h3>
                    <p class="text-gray-600">HTML forms the building blocks of every website, and it’s the first step to understanding how websites are structured and styled.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-code text-xl"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-blue-700">Easy to Learn and Use</h3>
                    <p class="text-gray-600">HTML is beginner-friendly and intuitive, making it easy to get started without any prior coding knowledge.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-hand-holding-heart text-xl"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-blue-700">Universal Skill</h3>
                    <p class="text-gray-600">Knowing HTML is a valuable skill that applies to various fields such as web design, content creation, and digital marketing.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-blue-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-brain text-xl"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-blue-700">Foundation for Advanced Learning</h3>
                    <p class="text-gray-600">HTML provides a strong foundation for learning other web technologies like CSS, JavaScript, and web frameworks.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Basic Concepts -->
    <div class="flex flex-col md:flex-row mb-20">
        <div class="w-full md:w-1/2 flex flex-col justify-center mb-6 md:mb-0">
            <h2 class="text-2xl font-bold text-orange-400 mb-4">HTML Basics</h2>
            <p class="text-gray-700 text-base leading-relaxed">HTML consists of elements used to structure the content on a web page. Each element is represented by a tag, such as:</p>
            <ul class="list-disc list-inside mt-4 text-gray-700">
                <li><strong>&lt;h1&gt; - &lt;h6&gt;</strong>: Headings of different sizes</li>
                <li><strong>&lt;p&gt;</strong>: Paragraphs</li>
                <li><strong>&lt;a&gt;</strong>: Links</li>
                <li><strong>&lt;img&gt;</strong>: Images</li>
                <li><strong>&lt;div&gt;</strong>: Divisions or sections</li>
            </ul>
            <p class="text-gray-700 text-base leading-relaxed mt-4">These tags allow you to organize and present content effectively on your web pages.</p>
        </div>
        <div class="w-full md:w-1/2">
            <img src="./Images/HTML2.jpg" alt="HTML Basics" class="rounded-lg shadow-md">
        </div>
    </div>

    <!-- Getting Started Guide -->
    <div class="bg-purple-50 rounded-lg p-8 mb-14">
        <h2 class="text-2xl font-bold text-orange-400 text-center mb-4">Getting Started with HTML</h2>
        <p class="text-gray-700 text-center mb-6">Follow these steps to start building your own web pages with HTML:</p>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-all">
                <img src="./Images/text_editor.webp" alt="Text Editor" class="mx-auto mb-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-purple-700">1. Choose a Text Editor</h3>
                <p class="text-gray-600">Install a code editor like VS Code or Sublime Text to write and edit HTML code.</p>
            </div>
            <div class="text-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-all">
                <img src="./Images/htmlpage.gif" alt="HTML Template" class="mx-auto mb-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-purple-700">2. Create an HTML File</h3>
                <p class="text-gray-600">Start by creating a new file with the <code>.html</code> extension, and add basic structure.</p>
            </div>
            <div class="text-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-all">
                <img src="./Images/browser.jpeg" alt="Run on Browser" class="mx-auto mb-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-purple-700">3. View in Browser</h3>
                <p class="text-gray-600">Open the HTML file in your browser to see the content displayed on a webpage.</p>
            </div>
        </div>
    </div>
</div>
<!-- Main Section Ends-->

<!-- Preview and Code -->
<div class="flex flex-col items-center justify-center px-4 mb-20">
    
    <!-- Sample Code 01 -->
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg mb-20">
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-100">
            <span class="text-xl font-bold text-gray-800">Sample Code 01</span>
            <div>
                <button id="previewButton1" onclick="showPreview1()" class="px-4 py-2 text-gray-600 bg-blue-500 text-white rounded-l-lg font-medium focus:outline-none hover:bg-blue-600">Preview</button>
                <button id="codeButton1" onclick="showCode1()" class="px-4 py-2 text-gray-600 bg-gray-200 rounded-r-lg font-medium focus:outline-none hover:bg-gray-300">Code</button>
            </div>
        </div>

        <div class="p-8 h-80 overflow-auto">
            <div id="previewSection1" class="text-gray-800">
                <h1 class="text-[40px]">Welcome to My Website</h1>
                <p>This is a simple HTML page structure.</p>
            </div>

            <div id="codeSection1" class="hidden bg-gray-900 text-white p-4 rounded-lg">
                <pre class="text-sm text-left whitespace-pre-wrap leading-relaxed">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;title&gt;My Website&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
        &lt;p&gt;This is a simple HTML page structure.&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;
                </pre>
            </div>
        </div>

        <!-- Tag Definitions for Sample Code 01 -->
        <div class="p-6 bg-gray-100 rounded-b-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Tag Definitions</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li><code>&lt;!DOCTYPE html&gt;</code> - Defines the document type and HTML version.</li>
                <li><code>&lt;html&gt;</code> - Root element of an HTML page.</li>
                <li><code>&lt;head&gt;</code> - Contains meta-information about the HTML document.</li>
                <li><code>&lt;title&gt;</code> - Sets the title of the webpage (appears on the browser tab).</li>
                <li><code>&lt;body&gt;</code> - Contains the content of the HTML page.</li>
                <li><code>&lt;h1&gt;</code> - Defines a top-level heading.</li>
                <li><code>&lt;p&gt;</code> - Defines a paragraph.</li>
            </ul>
        </div>
    </div>

    <!-- Sample Code 02 -->
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg mb-20">
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-100">
            <span class="text-xl font-bold text-gray-800">Sample Code 02</span>
            <div>
                <button id="previewButton2" onclick="showPreview2()" class="px-4 py-2 text-gray-600 bg-blue-500 text-white rounded-l-lg font-medium focus:outline-none hover:bg-blue-600">Preview</button>
                <button id="codeButton2" onclick="showCode2()" class="px-4 py-2 text-gray-600 bg-gray-200 rounded-r-lg font-medium focus:outline-none hover:bg-gray-300">Code</button>
            </div>
        </div>

        <div class="p-8 h-80 overflow-auto">
            <div id="previewSection2" class="text-gray-800">
                <h2 class="text-[30px]">My Favorite Websites</h2>
                <ul class="list-disc list-inside text-gray-700 mb-4">
                    <li><a href="https://www.google.com" class="text-blue-500 hover:underline">Google</a></li>
                    <li><a href="https://www.youtube.com" class="text-blue-500 hover:underline">YouTube</a></li>
                    <li><a href="https://www.wikipedia.org" class="text-blue-500 hover:underline">Wikipedia</a></li>
                </ul>
                <button class="px-4 py-2 bg-blue-500 text-white rounded">Click Me</button>
            </div>
            <div id="codeSection2" class="hidden bg-gray-900 text-white p-4 rounded-lg overflow-auto">
                <pre class="text-sm text-left whitespace-pre-wrap leading-relaxed">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;title&gt;My Favorite Websites&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h2&gt;My Favorite Websites&lt;/h2&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a href="https://www.google.com"&gt;Google&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="https://www.youtube.com"&gt;YouTube&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="https://www.wikipedia.org"&gt;Wikipedia&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        &lt;button&gt;Click Me&lt;/button&gt;
    &lt;/body&gt;
&lt;/html&gt;
                </pre>
            </div>
        </div>

        <!-- Tag Definitions for Sample Code 02 -->
        <div class="p-6 bg-gray-100 rounded-b-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Tag Definitions</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li><code>&lt;ul&gt;</code> - Defines an unordered list.</li>
                <li><code>&lt;li&gt;</code> - Represents an item in a list.</li>
                <li><code>&lt;a&gt;</code> - Defines a hyperlink.</li>
                <li><code>&lt;button&gt;</code> - Represents a clickable button.</li>
            </ul>
        </div>
    </div>

    <!-- Sample Code 03 -->
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-100">
            <span class="text-xl font-bold text-gray-800">Sample Code 03</span>
            <div>
                <button id="previewButton3" onclick="showPreview3()" class="px-4 py-2 text-gray-600 bg-blue-500 text-white rounded-l-lg font-medium focus:outline-none hover:bg-blue-600">Preview</button>
                <button id="codeButton3" onclick="showCode3()" class="px-4 py-2 text-gray-600 bg-gray-200 rounded-r-lg font-medium focus:outline-none hover:bg-gray-300">Code</button>
            </div>
        </div>

        <div class="p-8 h-80 overflow-auto">
            <div id="previewSection3" class="text-gray-800">
                <h3 class="text-[28px]">Steps to Create a Simple Web Page</h3>
                <ol class="list-decimal list-inside text-gray-700 mb-4">
                    <li>Open a text editor.</li>
                    <li>Write basic HTML structure.</li>
                    <li>Save the file with a .html extension.</li>
                    <li>Open the file in a browser to view.</li>
                </ol>
                <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="rounded mt-4">
                <p class="mt-4">Follow these steps to create your first web page using HTML!</p>
            </div>
            <div id="codeSection3" class="hidden bg-gray-900 text-white p-4 rounded-lg overflow-auto">
                <pre class="text-sm text-left whitespace-pre-wrap leading-relaxed">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;title&gt;Steps to Create a Simple Web Page&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h3&gt;Steps to Create a Simple Web Page&lt;/h3&gt;
        &lt;ol&gt;
            &lt;li&gt;Open a text editor.&lt;/li&gt;
            &lt;li&gt;Write basic HTML structure.&lt;/li&gt;
            &lt;li&gt;Save the file with a .html extension.&lt;/li&gt;
            &lt;li&gt;Open the file in a browser to view.&lt;/li&gt;
        &lt;/ol&gt;
        &lt;img src="https://via.placeholder.com/150" alt="Placeholder Image"&gt;
        &lt;p&gt;Follow these steps to create your first web page using HTML!&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;
                </pre>
            </div>
        </div>

        <!-- Tag Definitions for Sample Code 03 -->
        <div class="p-6 bg-gray-100 rounded-b-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Tag Definitions</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li><code>&lt;ol&gt;</code> - Defines an ordered list.</li>
                <li><code>&lt;img&gt;</code> - Embeds an image in the HTML page.</li>
                <li><code>&lt;p&gt;</code> - Defines a paragraph.</li>
            </ul>
        </div>
    </div>
</div>
<!-- Preview and Code Ends -->

<!-- References -->
<div class="max-w-5xl mx-auto p-6 space-y-12 mb-16">
    <!-- Section Title -->
    <h2 class="text-4xl font-extrabold text-center text-orange-400">HTML Learning Resources</h2>
    <p class="text-center text-gray-600 text-lg">Explore these resources to kickstart your HTML journey!</p>
    
    <!-- YouTube Playlists Section -->
    <div class="bg-gray-100 rounded-lg shadow-lg p-6">
        <h3 class="text-2xl font-semibold text-yellow-500 mb-4">📺 HTML YouTube Playlists</h3>
        <p class="text-gray-700 mb-6">Learn HTML from some of the best YouTube playlists curated for beginners:</p>
        
        <div class="space-y-4">
            <!-- YouTube Link 1 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-blue-50 transition">
                <span class="text-yellow-400 text-2xl mr-4">▶️</span>
                <a href="https://youtube.com/playlist?list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&si=RPxNEEnu4wO1c3gq" class="text-lg font-medium text-yellow-500 hover:underline">Chai aur Code HTML Playlist</a>
            </div>

            <!-- YouTube Link 2 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-yellow-50 transition">
                <span class="text-yellow-400 text-2xl mr-4">▶️</span>
                <a href="https://youtu.be/BsDoLVMnmZs?si=QMfEbOejraCOfQ9z" class="text-lg font-medium text-yellow-500 hover:underline">Code with Harry HTML one shot</a>
            </div>

            <!-- YouTube Link 3 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-yellow-50 transition">
                <span class="text-yellow-400 text-2xl mr-4">▶️</span>
                <a href="https://youtu.be/kUMe1FH4CHE?si=nLIh6jU6yF0sibsM" class="text-lg font-medium text-yellow-500 hover:underline">Free Code Camp HTML Tutorial</a>
            </div>
        </div>
    </div>

    <!-- Practice Worksheets Section -->
    <div class="bg-gray-100 rounded-lg shadow-lg p-6 ">
        <h3 class="text-2xl font-semibold text-green-600 mb-4">📝 HTML Practice Worksheets</h3>
        <p class="text-gray-700 mb-6">Enhance your skills with these practical worksheets:</p>
        
        <div class="space-y-4">
            <!-- Worksheet Link 1 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-green-50 transition">
                <span class="text-green-500 text-2xl mr-4">📄</span>
                <a href="https://www.w3schools.com/html/html_exercises.asp" class="text-lg font-medium text-green-600 hover:underline">Basic HTML Practice Worksheet</a>
            </div>

            <!-- Worksheet Link 2 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-green-50 transition">
                <span class="text-green-500 text-2xl mr-4">📄</span>
                <a href="https://www.codechef.com/practice/html" class="text-lg font-medium text-green-600 hover:underline">Intermediate HTML Practice Worksheet</a>
            </div>

            <!-- Worksheet Link 3 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-green-50 transition">
                <span class="text-green-500 text-2xl mr-4">📄</span>
                <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Test_your_skills:_Advanced_HTML_text" class="text-lg font-medium text-green-600 hover:underline">Advanced HTML Practice Worksheet</a>
            </div>
        </div>
    </div>
</div>
<!-- References Ends-->

<!-- Summarize and Redirection -->
<div class="max-w-5xl mx-auto p-6 space-y-12">

    <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Summary of HTML Learnings</h2>
        <p class="text-gray-700 text-center text-lg mb-4 font-semibold">
            Congratulations on completing the HTML module! Here's a recap of what you've learned:
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all">
                <h3 class="text-xl font-semibold text-orange-500">Basic Structure</h3>
                <p class="text-gray-600 mt-2">Understand the foundational structure of HTML documents, including elements like <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>.</p>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all">
                <h3 class="text-xl font-semibold text-orange-500">Text Formatting</h3>
                <p class="text-gray-600 mt-2">Learn how to format text using headings, paragraphs, lists, and other inline elements like <code>&lt;b&gt;</code>, <code>&lt;i&gt;</code>, and <code>&lt;span&gt;</code>.</p>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all">
                <h3 class="text-xl font-semibold text-orange-500">Links and Images</h3>
                <p class="text-gray-600 mt-2">Discover how to add hyperlinks with <code>&lt;a&gt;</code> tags and embed images using <code>&lt;img&gt;</code> to make your pages interactive.</p>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all">
                <h3 class="text-xl font-semibold text-orange-500">Lists and Tables</h3>
                <p class="text-gray-600 mt-2">Create ordered and unordered lists for content organization, and build tables using <code>&lt;table&gt;</code> to display data effectively.</p>
            </div>
        </div>
    </div>

    <!-- CSS Course Call-to-Action Section -->
    <div class="bg-white rounded-lg shadow-lg p-10 mt-10 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-700 opacity-30"></div>
        <h2 class="text-3xl font-bold text-blue-600 relative z-10 mb-4">Ready to Level Up Your Skills?</h2>
        <p class="text-gray-700 font-semibold relative z-10 text-lg mb-6">Take the next step in your web development journey and master the art of styling with CSS!</p>

        <a href="css.jsp" class="relative z-10 inline-block bg-orange-400 text-white font-semibold px-5 py-2 rounded-lg text-md hover:bg-blue-500 transition-all">
            Explore CSS Course
        </a>

        <div class="absolute bottom-0 right-0 transform translate-x-8 translate-y-8 opacity-10 z-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-48 h-48 text-purple-800" viewBox="0 0 24 24">
                <path d="M12 0l-1.485 16.172-4.387 1.235-.338-3.867h-2.25l.666 7.46 7.794 2.251 7.787-2.251.994-11.18h-10.781l.298-3.505h11.031v-6.315z"/>
            </svg>
        </div>
    </div>
</div>
<!-- Summarize and Redirection Ends-->

<!-- Footer -->
<footer class="w-full bg-gradient-to-r from-slate-500 to-slate-800 px-4 text-white pt-8 flex flex-col md:flex-row flex-wrap justify-between md:px-12 py-10">
    <div class="flex flex-col items-center justify-center ml-10">
        <img class="h-12 w-auto transition-all cursor-pointer rounded-xl" src="./Images/CJ.jpg" alt="Your Company">
        <p class="my-4 text-left"></p>
    </div>
    <div class="text-left">
        <h2 class="font-bold text-xl mt-4 cursor-default text-white">Get To Know Us</h2>
        <div class="w-[150px] h-1 border-b-2 border-yellow-400 rounded-2xl mb-4"></div>
        <ul>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="about-us.html">About Us</a>
            </li>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="faq.html">FAQ's</a>
            </li>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="privacy-policy.html">Privacy Policy</a>
            </li>
            
        </ul>
    </div>
    <div class="text-left">
        <h2 class="font-bold text-xl mt-4 text-white">Tech Stack</h2>
        <div class="w-[120px] h-1 border-b-2 border-yellow-400 rounded-2xl mb-4"></div>
        <ul>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="html.jsp">HTML</a>
            </li>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="css.jsp">CSS</a>
            </li>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="js.jsp">JavaScript</a>
            </li>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="db.jsp">Databases</a>
            </li>
            
        </ul>
    </div>
    <div class="text-left mr-10">
        <h2 class="font-bold text-xl mt-4 text-white">Links</h2>
        <div class="w-[125px] h-1 border-b-2 border-yellow-400 rounded-2xl mb-4"></div>
        <ul>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2 ">
                <a href="marketplace.jsp">Marketplace</a>
            </li>
            <li class="my-1 transition-all duration-300 text-white font-semibold hover:text-blue-400 hover:transform hover:translate-x-2">
                <a href="company.jsp">Company</a>
            </li>
            <!-- <li class="my-1 transition-all duration-300 text-black font-semibold hover:text-white hover:pl-2">
                <a href="#">Careers</a>
            </li> -->
            
        </ul>
    </div>
</footer>
<!-- Footer Ends-->


</body>
<script>
// Mobile menu toggle logic
const mobileMenuButton = document.getElementById('mobile-menu-open');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseButton = document.getElementById('mobile-menu-close');

// Open mobile menu when the mobile menu button is clicked
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('open'); // Show mobile menu with transition
});

// Close mobile menu when the close button is clicked
mobileMenuCloseButton.addEventListener('click', () => {
    mobileMenu.classList.remove('open'); // Hide mobile menu with transition
});

// Mobile Product dropdown toggle logic
const mobileProductButton = document.getElementById('mobile-product-button');
const mobileProductDropdown = document.getElementById('mobile-product-dropdown');

mobileProductButton.addEventListener('click', () => {
    mobileProductDropdown.classList.toggle('open'); // Toggle the dropdown
});

// Product dropdown toggle logic for desktop
const productButton = document.getElementById('product-button');
const productMenu = document.getElementById('product-menu');

// Toggle the "Product" dropdown menu when the button is clicked (Desktop)
productButton.addEventListener('click', () => {
if (productMenu.classList.contains('opacity-0')) {
    productMenu.classList.remove('opacity-0', 'translate-y-1', 'pointer-events-none');
    productMenu.classList.add('opacity-100', 'translate-y-0');
} else {
    productMenu.classList.add('opacity-0', 'translate-y-1', 'pointer-events-none');
    productMenu.classList.remove('opacity-100', 'translate-y-0');
}
});

 // JavaScript to handle carousel scrolling and active dot state
const carousel = document.getElementById('carousel');
        const dots = document.querySelectorAll('.dot');
        let activeSlide = 0;

        function setActiveSlide(index) {
            activeSlide = index;
            carousel.style.transform = `translateX(-${100 * index}%)`;
            updateDots();
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('bg-orange-600', index === activeSlide); 
                dot.classList.toggle('bg-gray-300', index !== activeSlide);  
            });
        }

        setInterval(() => {
            activeSlide = (activeSlide + 1) % dots.length; 
            setActiveSlide(activeSlide);
        }, 4000); 

        updateDots();

        
    // Functions for Sample Code 01
    function showPreview1() {
        document.getElementById('previewSection1').classList.remove('hidden');
        document.getElementById('codeSection1').classList.add('hidden');
        document.getElementById('previewButton1').classList.add('bg-blue-500', 'text-white');
        document.getElementById('previewButton1').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('codeButton1').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('codeButton1').classList.add('bg-gray-200', 'text-gray-600');
    }

    function showCode1() {
        document.getElementById('codeSection1').classList.remove('hidden');
        document.getElementById('previewSection1').classList.add('hidden');
        document.getElementById('codeButton1').classList.add('bg-blue-500', 'text-white');
        document.getElementById('codeButton1').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('previewButton1').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('previewButton1').classList.add('bg-gray-200', 'text-gray-600');
    }

    // Functions for Sample Code 02
    function showPreview2() {
        document.getElementById('previewSection2').classList.remove('hidden');
        document.getElementById('codeSection2').classList.add('hidden');
        document.getElementById('previewButton2').classList.add('bg-blue-500', 'text-white');
        document.getElementById('previewButton2').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('codeButton2').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('codeButton2').classList.add('bg-gray-200', 'text-gray-600');
    }

    function showCode2() {
        document.getElementById('codeSection2').classList.remove('hidden');
        document.getElementById('previewSection2').classList.add('hidden');
        document.getElementById('codeButton2').classList.add('bg-blue-500', 'text-white');
        document.getElementById('codeButton2').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('previewButton2').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('previewButton2').classList.add('bg-gray-200', 'text-gray-600');
    }

    // Functions for Sample Code 03
    function showPreview3() {
        document.getElementById('previewSection3').classList.remove('hidden');
        document.getElementById('codeSection3').classList.add('hidden');
        document.getElementById('previewButton3').classList.add('bg-blue-500', 'text-white');
        document.getElementById('previewButton3').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('codeButton3').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('codeButton3').classList.add('bg-gray-200', 'text-gray-600');
    }

    function showCode3() {
        document.getElementById('codeSection3').classList.remove('hidden');
        document.getElementById('previewSection3').classList.add('hidden');
        document.getElementById('codeButton3').classList.add('bg-blue-500', 'text-white');
        document.getElementById('codeButton3').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('previewButton3').classList.remove('bg-blue-500', 'text-white');
        document.getElementById('previewButton3').classList.add('bg-gray-200', 'text-gray-600');
    }

    // Initialize all sections to show the Preview view initially
    showPreview1();
    showPreview2();
    showPreview3();

    // DASHBOARD
    const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const closeSidebarButton = document.getElementById('closeSidebarButton');
        const profileButton = document.getElementById('profileButton');
        const loginButton = document.getElementById('loginButton');
        const logoutButton = document.getElementById('logoutButton');
        
        document.getElementById('logoutButton').addEventListener('click', function() {
            // Send a POST request to the LogoutServlet
            fetch('LogoutServlet', {
                method: 'POST',
                credentials: 'same-origin' // To include session cookie
            }).then(() => {
                window.location.href = 'index.jsp'; // Redirect to login page after logging out
            });
        });

        // Function to open sidebar
        function openSidebar() {
            sidebar.classList.remove('sidebar-hidden');
            sidebarOverlay.classList.remove('hidden');
            document.body.classList.add('sidebar-open'); // Prevents scrolling
        }

        // Function to close sidebar
        function closeSidebar() {
            sidebar.classList.add('sidebar-hidden');
            sidebarOverlay.classList.add('hidden');
            document.body.classList.remove('sidebar-open'); // Re-enable scrolling
        }

        // Event listener for profile button to open sidebar
        profileButton.addEventListener('click', openSidebar);


        // Event listener for close button and overlay to close sidebar
        closeSidebarButton.addEventListener('click', closeSidebar);

        // Log out button functionality
        logoutButton.addEventListener('click', () => {
            closeSidebar();
            // profileButton.classList.add('hidden');
            loginButton.classList.remove('hidden');
        });

     // Assuming you have the username stored in a session or somewhere accessible
        const username = "<%= userName %>";
        const now = new Date();
        const hours = now.getHours();
        const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';

        // Set the personalized greeting with the username
        document.getElementById('greeting').textContent = `${greeting}, ${username || 'User'}!`;
        document.getElementById('currentDate').textContent = now.toLocaleDateString();

        // Collapsible Skill Sections with Smooth Transition
        function toggleSkill(sectionId, arrowId) {
            const section = document.getElementById(sectionId);
            const arrow = document.getElementById(arrowId);
            section.classList.toggle('expanded');
            arrow.classList.toggle('rotate-180');
        }

                // Line Chart for Progress
                const ctx = document.getElementById('progressChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Progress',
                    data: [10, 20, 30, 40, 50],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // StrikeThrough effect in To-Do List
        function toggleTask(checkbox) {
        const todoText = checkbox.nextElementSibling; // Get the sibling span element
        if (checkbox.checked) {
            todoText.classList.add("line-through"); // Add strikethrough class
        } else {
            todoText.classList.remove("line-through"); // Remove strikethrough class
        }
    }
</script>
</html>