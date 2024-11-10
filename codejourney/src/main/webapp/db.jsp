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
    <title>Database</title>
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
        <svg height="90px" width="90px" version="1.1" id="_x36_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512"  xml:space="preserve">
<g>
	<g>
		<g>
			<g>
				<path style="fill:#8A8E4D;" d="M403.383,332.812v111.589c0,37.366-90.273,67.599-201.692,67.599
					c-70.571,0-132.734-12.144-168.742-30.573c-18.513-9.426-30.063-20.466-32.44-32.44C0.169,447.458,0,445.93,0,444.401V332.812
					c0-0.34,0-0.679,0.084-1.018c-0.084-0.17-0.084-0.255,0-0.34c0-0.595,0.085-1.189,0.17-1.783c0.085-0.255,0.085-0.51,0.17-0.765
					c0.085-0.68,0.254-1.358,0.51-2.038v-0.085c0.34-1.358,0.849-2.633,1.444-3.991c11.21-24.373,61.23-44.499,128.318-52.907
					c8.747-1.105,17.834-2.038,27.09-2.718h0.51c14.012-1.104,28.535-1.613,43.396-1.613s29.383,0.509,43.395,1.613h0.509
					c9.256,0.68,18.343,1.613,27.09,2.718c67.089,8.407,117.108,28.534,128.318,52.907c0.595,1.358,1.104,2.633,1.444,3.991v0.085
					c0.255,0.68,0.424,1.358,0.509,2.038c0.17,0.849,0.255,1.613,0.34,2.548v0.34C403.383,332.133,403.383,332.472,403.383,332.812z
					"/>
				<path style="opacity:0.1;fill:#E8E8E9;" d="M403.383,333.152v5.35c0,37.366-90.273,67.683-201.692,67.683
					C90.272,406.185,0,375.868,0,338.502v-5.35c0,0.849,0.084,1.613,0.169,2.378c2.633,26.326,50.274,48.916,117.958,59.191
					c2.378,0.34,4.671,0.68,7.049,1.019c3.821,0.594,7.643,1.104,11.549,1.529c1.614,0.085,3.312,0.255,5.01,0.509
					c9.427,1.019,19.193,1.784,29.213,2.293c6.709,0.339,13.503,0.594,20.382,0.679c3.397,0.085,6.879,0.085,10.361,0.085
					c3.482,0,6.963,0,10.36-0.085c6.879-0.085,13.672-0.34,20.382-0.679c10.021-0.509,19.787-1.274,29.213-2.293
					c1.698-0.254,3.397-0.424,5.01-0.509c3.907-0.425,7.728-0.935,11.549-1.529c2.378-0.339,4.671-0.679,7.049-1.019
					c67.684-10.275,115.325-32.865,117.958-59.191C403.298,334.765,403.383,334.001,403.383,333.152z"/>
				<path style="fill:#D6E0A5;" d="M403.383,332.472v0.68c0,0.849-0.085,1.613-0.17,2.378
					c-3.567,26.411-50.954,48.746-117.958,59.191c-2.378,0.34-4.671,0.68-7.049,1.019c-2.378,0.34-4.756,0.594-7.133,0.934
					c-1.444,0.17-2.973,0.34-4.416,0.595c-1.613,0.085-3.312,0.255-5.01,0.509c-6.285,0.594-12.738,1.189-19.278,1.614
					c-3.312,0.255-6.624,0.509-9.936,0.679c-6.709,0.255-13.503,0.509-20.382,0.679c-3.397,0.085-6.879,0.085-10.36,0.085
					c-3.482,0-6.964,0-10.361-0.085c-6.879-0.17-13.672-0.424-20.382-0.679c-3.312-0.17-6.624-0.424-9.936-0.679
					c-6.539-0.425-12.993-1.02-19.278-1.614c-1.698-0.254-3.397-0.424-5.01-0.509c-1.443-0.255-2.972-0.425-4.416-0.595
					c-2.378-0.34-4.756-0.594-7.133-0.934c-2.378-0.339-4.671-0.679-7.049-1.019C51.123,384.276,3.736,361.941,0.169,335.53
					C0.084,334.765,0,334.001,0,333.152v-0.68c0-0.254,0-0.424,0.084-0.678c-0.084-0.17-0.084-0.255,0-0.34
					c0.085-0.935,0.17-1.699,0.34-2.548c0.085-0.425,0.169-0.849,0.169-1.274c-0.084-0.169,0-0.339,0.085-0.509
					c0-0.17,0-0.425,0.085-0.68c0.17-0.509,0.255-1.103,0.51-1.613c0.255-0.765,0.595-1.613,0.934-2.463
					c10.531-24.203,58.512-44.245,123.308-53.162c7.728-1.103,15.711-2.038,23.948-2.717c0.085-0.085,0.255-0.085,0.34-0.085
					c16.56-1.529,33.969-2.293,51.888-2.293c17.919,0,35.328,0.764,51.888,2.293c0.085,0,0.255,0,0.34,0.085
					c8.238,0.679,16.221,1.614,23.948,2.717c64.796,8.917,112.778,28.959,123.308,53.162c0.594,1.359,1.104,2.718,1.444,4.076
					c0.17,0.85,0.17,1.614,0.339,2.463c0.17,0.849,0.255,1.613,0.34,2.548v0.34C403.298,331.963,403.383,332.218,403.383,332.472z"
					/>
			</g>
			<path style="fill:#D6E0A5;" d="M336.696,426.451v31.189c-16.248,4.913-34.889,8.949-55.283,11.888v-31.189
				C301.808,435.4,320.448,431.364,336.696,426.451z"/>
		</g>
		<path style="opacity:0.3;fill:#040000;" d="M402.619,326.443c-0.085,0.17-0.085,0.255-0.17,0.34v0.085
			c-9.511,34.309-95.708,61.144-200.757,61.144c-105.05,0-191.246-26.835-200.758-61.144v-0.085
			c-0.085-0.085-0.085-0.17-0.085-0.255l-0.085-0.085c0.17-0.509,0.255-1.103,0.51-1.613c0.255-0.765,0.595-1.613,0.934-2.463
			c10.531-24.203,58.512-44.245,123.308-53.162c7.728-1.103,15.711-2.038,23.948-2.717c0.085-0.085,0.255-0.085,0.34-0.085
			c16.56-1.529,33.969-2.293,51.888-2.293c17.919,0,35.328,0.764,51.888,2.293c0.085,0,0.255,0,0.34,0.085
			c8.238,0.679,16.221,1.614,23.948,2.717c64.796,8.917,112.778,28.959,123.308,53.162
			C401.77,323.726,402.279,325.085,402.619,326.443z"/>
		<g>
			<g>
				<path style="fill:#8A8E4D;" d="M403.383,200.842v111.505c0,3.396-0.765,6.793-2.208,10.02c-0.085,0.17-0.17,0.34-0.17,0.425
					c-15.031,32.44-98.51,57.153-199.314,57.153c-100.804,0-184.283-24.713-199.314-57.153c0-0.085-0.085-0.255-0.17-0.425
					c-0.34-0.849-0.679-1.698-0.934-2.463c-0.255-0.848-0.51-1.613-0.68-2.462c0,0,0-0.085,0-0.17
					c-0.254-0.679-0.34-1.444-0.425-2.208C0.084,314.129,0,313.28,0,312.346V200.758c0-1.954,0.34-3.992,0.849-5.86
					c0.085-0.17,0.085-0.34,0.17-0.425c0.34-1.273,0.849-2.547,1.359-3.736c11.295-24.373,61.399-44.499,128.403-52.907
					c8.747-1.104,17.749-2.038,27.005-2.718c14.098-1.018,28.789-1.613,43.906-1.613c15.116,0,29.807,0.595,43.905,1.613
					c9.256,0.68,18.258,1.614,27.005,2.718c67.004,8.407,117.108,28.534,128.403,52.907c0.51,1.189,1.019,2.463,1.359,3.736
					c0.085,0.085,0.085,0.255,0.17,0.425C403.043,196.85,403.383,198.804,403.383,200.842z"/>
				<path style="opacity:0.1;fill:#E8E8E9;" d="M403.383,201.182v5.351c0,28.278-51.888,52.482-125.516,62.672
					c-1.699,0.17-3.482,0.425-5.18,0.68c-22.08,2.717-46.029,4.246-70.995,4.246c-24.967,0-48.916-1.529-70.996-4.246
					c-1.699-0.255-3.482-0.51-5.18-0.68C51.888,259.015,0,234.811,0,206.533v-5.351c0,0.765,0.084,1.614,0.169,2.378
					c2.718,26.921,52.652,49.935,122.969,59.871c0.679,0.085,1.358,0.17,2.038,0.255c5.435,0.848,10.87,1.443,16.56,2.038
					c2.548,0.255,5.096,0.509,7.728,0.764c2.718,0.254,5.52,0.509,8.322,0.679h0.51c10.7,0.85,21.74,1.359,33.035,1.529
					c3.397,0.084,6.879,0.084,10.361,0.084c3.482,0,6.963,0,10.36-0.084c11.295-0.17,22.335-0.679,33.035-1.529h0.509
					c2.803-0.17,5.605-0.425,8.322-0.679c2.633-0.255,5.18-0.509,7.728-0.764c5.69-0.595,11.125-1.19,16.56-2.038l2.039-0.255
					c70.316-9.936,120.25-32.95,122.968-59.871C403.298,202.796,403.383,201.947,403.383,201.182z"/>
				<path style="fill:#D6E0A5;" d="M403.383,200.418v0.764c0,0.765-0.085,1.614-0.17,2.378
					c-3.652,26.921-53.332,49.765-122.968,59.871l-2.039,0.255c-2.378,0.339-4.756,0.594-7.133,0.933
					c-3.142,0.34-6.2,0.68-9.426,1.105c-2.633,0.255-5.35,0.509-8.068,0.679c-2.803,0.254-5.605,0.509-8.492,0.764
					c-0.934,0-1.784,0.085-2.718,0.17c-3.312,0.255-6.624,0.425-9.936,0.595c-6.709,0.339-13.503,0.594-20.382,0.764h-20.721
					c-6.879-0.17-13.672-0.425-20.382-0.764c-3.312-0.17-6.624-0.34-9.936-0.595c-0.934-0.085-1.783-0.17-2.718-0.17
					c-2.887-0.255-5.69-0.51-8.492-0.764c-2.718-0.17-5.435-0.424-8.068-0.679c-3.227-0.425-6.284-0.765-9.426-1.105
					c-2.378-0.339-4.756-0.594-7.133-0.933c-0.679-0.085-1.359-0.17-2.038-0.255C53.501,253.324,3.821,230.481,0.169,203.56
					C0.084,202.796,0,201.947,0,201.182v-0.764c0-0.849,0.084-1.699,0.169-2.547c0.085-0.85,0.17-1.699,0.425-2.548
					c0-0.255,0.085-0.595,0.17-0.85h401.855c0.185,0.708,0.159,1.442,0.277,2.153c0.208,1.034,0.343,2.082,0.404,3.142
					C403.306,199.987,403.383,200.195,403.383,200.418z"/>
			</g>
			<path style="fill:#D6E0A5;" d="M336.696,294.411v31.189c-16.248,4.913-34.889,8.949-55.283,11.888v-31.189
				C301.808,303.359,320.448,299.324,336.696,294.411z"/>
		</g>
		<path style="opacity:0.3;fill:#040000;" d="M402.534,194.472v0.425c-9.766,34.309-95.878,61.144-200.842,61.144
			c-104.965,0-191.076-26.835-200.843-61.144v-0.425H402.534z"/>
		<g>
			<g>
				<path style="fill:#8A8E4D;" d="M403.383,68.787v111.504c0,3.566-0.85,7.049-2.378,10.445c-0.594,1.274-1.274,2.463-2.038,3.736
					c-19.363,30.573-100.294,53.502-197.275,53.502c-96.982,0-177.913-22.929-197.276-53.502c-0.764-1.273-1.444-2.462-2.038-3.736
					c0-0.085-0.085-0.255-0.17-0.425c-0.34-0.763-0.679-1.613-0.934-2.462c-0.255-0.679-0.425-1.359-0.595-2.038
					c-0.085-0.255-0.169-0.594-0.169-0.849c-0.17-0.68-0.255-1.274-0.34-1.953C0.084,182.074,0,181.225,0,180.291V68.702
					C0.679,31.506,90.698,1.528,201.692,1.528c68.617,0,129.252,11.465,165.684,29.044c21.231,10.191,34.309,22.505,35.838,35.838
					C403.298,67.173,403.383,68.023,403.383,68.787z"/>
				<path style="opacity:0.1;fill:#E8E8E9;" d="M403.383,69.127v5.35c0,28.958-54.351,53.671-130.781,63.352
					c-22.08,2.718-45.943,4.246-70.91,4.246c-24.967,0-48.831-1.528-70.911-4.246C54.35,128.148,0,103.435,0,74.478v-5.35
					c0,30.402,59.616,56.049,141.736,64.541c5.266,0.51,10.615,1.019,16.05,1.443c14.098,1.02,28.789,1.614,43.906,1.614
					c15.116,0,29.807-0.594,43.905-1.614c5.435-0.424,10.785-0.933,16.051-1.443C343.767,125.176,403.383,99.529,403.383,69.127z"/>
				<path style="fill:#D6E0A5;" d="M403.383,68.363v0.424c-0.51,30.487-59.956,56.219-141.736,64.881
					c-5.266,0.51-10.615,1.019-16.051,1.443c-14.097,1.02-28.789,1.614-43.905,1.614c-15.117,0-29.808-0.594-43.906-1.614
					c-5.435-0.424-10.785-0.933-16.05-1.443C59.956,125.006,0.51,99.274,0,68.787v-0.424C0,30.657,90.272,0,201.692,0
					c67.259,0,126.79,11.21,163.476,28.364c22.929,10.7,36.941,23.863,38.045,38.046C403.383,67.004,403.383,67.683,403.383,68.363z
					"/>
			</g>
			<path style="fill:#D6E0A5;" d="M336.696,162.37v31.189c-16.248,4.913-34.889,8.949-55.283,11.888v-31.189
				C301.808,171.319,320.448,167.283,336.696,162.37z"/>
		</g>
	</g>
	<path style="opacity:0.2;fill:#FFFFFF;" d="M201.692,0v512c-70.571,0-132.734-12.144-168.742-30.573
		c-18.513-9.426-30.063-20.466-32.44-32.44C0.169,447.458,0,445.93,0,444.401V332.472c0-0.254,0-0.424,0.084-0.678
		c-0.084-0.17-0.084-0.255,0-0.34c0-0.595,0.085-1.189,0.17-1.783c0-0.68,0.085-1.36,0.34-2.039c-0.084-0.169,0-0.339,0.085-0.509
		c0-0.255,0-0.425,0.17-0.595c0.085-0.594,0.254-1.103,0.425-1.698c0.255-0.765,0.595-1.613,0.934-2.463
		c-0.34-0.849-0.679-1.698-0.934-2.463c-0.255-0.848-0.51-1.613-0.68-2.462c0,0,0-0.085,0-0.17c-0.254-0.679-0.34-1.444-0.425-2.208
		C0.084,314.129,0,313.28,0,312.346V200.418c0-0.849,0.084-1.699,0.169-2.547c0.085-0.85,0.17-1.699,0.425-2.548
		c0-0.255,0.085-0.51,0.255-0.85c0.254-1.358,0.764-2.801,1.359-4.161c-0.34-0.763-0.679-1.613-0.934-2.462
		c-0.255-0.679-0.425-1.359-0.595-2.038c-0.085-0.255-0.169-0.594-0.169-0.849c-0.17-0.68-0.255-1.274-0.34-1.953
		C0.084,182.074,0,181.225,0,180.291V68.363C0,30.657,90.272,0,201.692,0z"/>
</g>
        </svg>
        <div class="flex flex-1 flex-col items-center gap-6 text-center">
            <a href="https://developer.mozilla.org/en-US/docs/Glossary/Database">
                <span class="inline-flex items-center justify-center rounded-[64px] border text-center font-semibold transition-all duration-300 ease-in-out h-7 px-3 py-1 text-sm border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-400 hover:text-white">
                    Oracle, MySQL, MongoDB
                </span>
            </a>            
            <div class="flex max-w-lg flex-col gap-6">
                <h3 class="text-4xl font-semibold text-slate-950 md:text-6xl">Database</h3>
                <p class="text-lg font-normal leading-7 text-slate-500">Why did the database administrator break up with the table? Because there were just too many relationships!</p>
            </div>
        </div>
        <div class="flex gap-4 justify-center">
            <a href="#main">
                <button type="button" aria-disabled="false"
                class="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out bg-orange-500 stroke-white px-5 text-white hover:bg-green-600 h-[42px] min-w-[42px] gap-200">
                Dive In
            </button>
            </a>
        </div>
    </div>
</section>
<!-- Hero Section Ends -->

<!-- First Section -->
<div class="w-[90%] mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-r from-green-50 to-green-100 mb-10 h-[550px] bg-no-repeat bg-center bg-cover relative"
    style="background-image: url('./Images/Database.avif');">

        <!-- Left Heading Section -->
        <div class="w-full md:w-1/3 flex flex-col justify-center items-center text-center p-8 z-10 backdrop-blur-md bg-opacity-5 rounded">
            <h2 class="text-4xl font-extrabold text-gray-100 mb-4 ">
                Master Database Fundamentals
            </h2>
            <p class="text-white font-semibold text-base leading-7">
                Learn essential database concepts and explore popular database platforms to efficiently manage and retrieve data.
            </p>
            <a href="#herosection">
                <button type="button" aria-disabled="false"
                        class="mt-10 group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out bg-orange-500 stroke-white px-5 text-white hover:bg-green-500 h-[42px] min-w-[42px]">
                            Get Started
                        </button>
            </a>
        </div>

        <!-- Right Carousel Section -->
        <div class="relative w-full md:w-2/3 overflow-hidden rounded-lg shadow-lg h-full flex items-center z-10">

            <!-- Carousel Wrapper -->
            <div id="carousel" class="flex h-full w-full relative z-10" style="transform: translateX(0);">
                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg ">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">Relational Databases</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">Relational databases store data in structured tables and use SQL for managing and querying data.</p>
                    <div class="border-t-2 border-green-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Store data in rows and columns (tables).</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Use primary and foreign keys for data relationships.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Enforce ACID properties for transaction reliability.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Popular platforms: MySQL, PostgreSQL, Oracle, and SQL Server.</li>
                    </ul>
                </div>
                
                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg shadow-lg">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">NoSQL Databases</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">NoSQL databases offer flexible schemas and are designed for handling large-scale, unstructured data.</p>
                    <div class="border-t-2 border-green-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Document, key-value, column-family, and graph databases.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Schema-less, making it flexible for evolving data.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Ideal for big data and real-time applications.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Popular platforms: MongoDB, Cassandra, Redis, Couchbase.</li>
                    </ul>
                </div>
                
                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg shadow-lg">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">Data Warehousing</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">Data warehouses are designed for storing large volumes of historical data for analytical and reporting purposes.</p>
                    <div class="border-t-2 border-green-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Stores structured data optimized for analysis.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Supports complex queries for business intelligence.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Data is usually processed in batches.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Popular platforms: Amazon Redshift, Snowflake, Google BigQuery.</li>
                    </ul>
                </div>
                
                <div class="w-full flex-shrink-0 p-8 h-full flex flex-col justify-center items-center rounded-lg shadow-lg">
                    <h3 class="text-4xl font-extrabold text-white text-center mb-4">In-Memory Databases</h3>
                    <p class="text-white text-lg text-center leading-relaxed max-w-md mx-auto">In-memory databases store data in the main memory (RAM) for ultra-fast data access.</p>
                    <div class="border-t-2 border-green-300 mt-6 mb-6 w-2/3 mx-auto opacity-50"></div>
                    <ul class="space-y-4 mt-4 text-white text-lg text-left max-w-md mx-auto">
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Used for real-time applications and caching.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Data retrieval is faster compared to disk-based storage.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Optimized for speed but limited by RAM capacity.</li>
                        <li class="flex items-start"><span class="text-yellow-400 mr-3">✓</span> Popular platforms: Redis, Memcached, SAP HANA.</li>
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
        <h1 class="text-4xl font-extrabold text-orange-500 mb-4 mt-12">Getting Started with Databases</h1>
        <p class="text-gray-600 text-lg">A complete guide to start your journey in database management and data-driven applications.</p>
    </div>

    <!-- Introduction to Databases -->
    <div class="flex flex-col md:flex-row mb-12">
        <div class="w-full md:w-1/2 mb-6 md:mb-0">
            <img src="./Images/Database1.avif" alt="Introduction to Databases" class="rounded-lg shadow-md">
        </div>
        <div class="w-full md:w-1/2 md:pl-8 flex flex-col justify-center">
            <h2 class="text-2xl font-bold text-green-600 mb-4">What is a Database?</h2>
            <p class="text-gray-700 text-base leading-relaxed">A database is a structured collection of data that allows you to efficiently store, manage, and retrieve information. Databases are used in a wide range of applications, from websites to enterprise systems.</p>
            <p class="text-gray-700 text-base leading-relaxed mt-4">Databases are essential in modern applications, enabling organizations to make data-driven decisions and enhance user experiences.</p>
        </div>
    </div>

    <!-- Why Learn Databases -->
    <div class="bg-green-50 rounded-lg p-8 mt-20 mb-20">
        <h2 class="text-2xl font-bold text-green-600 text-center mb-10">Why Learn Databases?</h2>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="flex items-start mb-7">
                <div class="bg-orange-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-database text-xl"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-orange-600">Efficient Data Management</h3>
                    <p class="text-gray-600">Databases enable efficient storage, organization, and retrieval of large volumes of data, making data management easier and more reliable.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-orange-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-chart-line text-xl"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-orange-600">Data-Driven Decision Making</h3>
                    <p class="text-gray-600">Learning databases helps you analyze and retrieve data for insights, which supports data-driven decision-making processes in organizations.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-orange-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-network-wired text-xl"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-orange-600">Support for Complex Applications</h3>
                    <p class="text-gray-600">Databases form the backbone of complex applications like e-commerce, social media, and enterprise solutions.</p>
                </div>
            </div>
            <div class="flex items-start">
                <div class="bg-orange-500 text-white rounded-full p-3 mr-4">
                    <i class="fas fa-lock text-xl"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-orange-600">Data Security and Integrity</h3>
                    <p class="text-gray-600">Databases ensure data security and integrity, making them crucial for handling sensitive information and regulatory compliance.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Basic Concepts -->
    <div class="flex flex-col md:flex-row mb-20">
        <div class="w-full md:w-1/2 flex flex-col justify-center mb-6 md:mb-0">
            <h2 class="text-2xl font-bold text-green-600 mb-4">Database Basics</h2>
            <p class="text-gray-700 text-base leading-relaxed">Databases consist of several core concepts that are essential for organizing and retrieving data efficiently. Some of these include:</p>
            <ul class="list-disc list-inside mt-4 text-gray-700">
                <li><strong>Tables:</strong> Structured collections of rows and columns that store related data.</li>
                <li><strong>Primary Key:</strong> A unique identifier for each row in a table, ensuring data integrity.</li>
                <li><strong>Foreign Key:</strong> A reference to a primary key in another table, used to create relationships between tables.</li>
                <li><strong>Indexes:</strong> Structures that improve data retrieval speed, making queries more efficient.</li>
                <li><strong>Queries:</strong> Commands to retrieve or manipulate data, typically written in SQL (Structured Query Language).</li>
            </ul>
            <p class="text-gray-700 text-base leading-relaxed mt-4">These basics form the foundation for more advanced database management and data retrieval techniques.</p>
        </div>
        <div class="w-full md:w-1/2">
            <img src="./Images/Database2.gif" alt="Database Basics" class="rounded-lg shadow-md">
        </div>
    </div>

    <!-- Getting Started Guide -->
    <div class="bg-purple-50 rounded-lg p-8 mb-14">
        <h2 class="text-2xl font-bold text-green-600 text-center mb-4">Getting Started with Databases</h2>
        <p class="text-gray-700 text-center mb-6">Follow these steps to start working with databases:</p>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-all">
                <img src="./Images/dbsoftware.gif" alt="Database Software" class="h-60 mx-auto mb-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-purple-700">1. Choose a Database Software</h3>
                <p class="text-gray-600">Select a database management system like MySQL, PostgreSQL, or MongoDB to store and manage your data.</p>
            </div>
            <div class="text-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-all">
                <img src="./Images/db2.png" alt="Create Database" class="mx-auto mb-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-purple-700">2. Create Your First Database</h3>
                <p class="text-gray-600">Set up your database structure with tables and define relationships between them.</p>
            </div>
            <div class="text-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-all">
                <img src="./Images/db-query.gif" alt="Query Console" class="mx-auto mb-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-purple-700">3. Write and Execute Queries</h3>
                <p class="text-gray-600">Use SQL or other query languages to insert, retrieve, and manage data in your database.</p>
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
                <button id="previewButton1" onclick="showPreview1()" class="px-4 py-2 text-gray-600 bg-orange-500 text-white rounded-l-lg font-medium focus:outline-none hover:bg-orange-600">Preview</button>
                <button id="codeButton1" onclick="showCode1()" class="px-4 py-2 text-gray-600 bg-gray-200 rounded-r-lg font-medium focus:outline-none hover:bg-gray-300">Code</button>
            </div>
        </div>

        <div class="p-8 h-80 overflow-auto">
            <!-- Query Output -->
            <div id="previewSection1" class="text-gray-800">
                <h1 class="text-[30px] font-bold mb-4">Employee List - Department: HR</h1>
                <table class="table-auto w-full text-left bg-gray-50 rounded-lg shadow-md">
                    <thead>
                        <tr class="bg-green-100">
                            <th class="px-4 py-2">ID</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border px-4 py-2">1</td>
                            <td class="border px-4 py-2">Alice</td>
                            <td class="border px-4 py-2">HR</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Query Code -->
            <div id="codeSection1" class="hidden bg-gray-900 text-white p-4 rounded-lg">
                <pre class="text-sm text-left whitespace-pre-wrap leading-relaxed">
SELECT id, name, department
FROM employees
WHERE department = 'HR';
                </pre>
            </div>
        </div>

        <!-- Tag Definitions for Sample Code 01 -->
        <div class="p-6 bg-gray-100 rounded-b-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Tag Definitions</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li><code>SELECT</code> - Specifies the columns to retrieve data from.</li>
                <li><code>FROM</code> - Defines the table to fetch data from.</li>
                <li><code>WHERE</code> - Filters data based on a condition.</li>
                <li><code>'HR'</code> - A specific value to filter rows where the department is HR.</li>
            </ul>
        </div>
    </div>

    <!-- Sample Code 02 -->
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg mb-20">
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-100">
            <span class="text-xl font-bold text-gray-800">Sample Code 02</span>
            <div>
                <button id="previewButton2" onclick="showPreview2()" class="px-4 py-2 text-gray-600 bg-orange-500 text-white rounded-l-lg font-medium focus:outline-none hover:bg-orange-600">Preview</button>
                <button id="codeButton2" onclick="showCode2()" class="px-4 py-2 text-gray-600 bg-gray-200 rounded-r-lg font-medium focus:outline-none hover:bg-gray-300">Code</button>
            </div>
        </div>

        <div class="p-8 h-80 overflow-auto">
            <!-- Query Output -->
            <div id="previewSection2" class="text-gray-800">
                <h2 class="text-[30px] font-bold mb-4">Product Sales Summary</h2>
                <table class="table-auto w-full text-left bg-gray-50 rounded-lg shadow-md">
                    <thead>
                        <tr class="bg-blue-100">
                            <th class="px-4 py-2">Product</th>
                            <th class="px-4 py-2">Total Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border px-4 py-2">Laptop</td>
                            <td class="border px-4 py-2">50</td>
                        </tr>
                        <tr>
                            <td class="border px-4 py-2">Mouse</td>
                            <td class="border px-4 py-2">150</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Query Code -->
            <div id="codeSection2" class="hidden bg-gray-900 text-white p-4 rounded-lg overflow-auto">
                <pre class="text-sm text-left whitespace-pre-wrap leading-relaxed">
SELECT product, SUM(quantity) AS total_quantity
FROM sales
GROUP BY product
ORDER BY total_quantity DESC;
                </pre>
            </div>
        </div>

        <!-- Tag Definitions for Sample Code 02 -->
        <div class="p-6 bg-gray-100 rounded-b-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Tag Definitions</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li><code>SUM()</code> - Calculates the total sum of a column.</li>
                <li><code>AS</code> - Renames a column for display purposes.</li>
                <li><code>GROUP BY</code> - Groups rows that have the same values in specified columns.</li>
                <li><code>ORDER BY</code> - Sorts the result set by one or more columns.</li>
            </ul>
        </div>
    </div>

    <!-- Sample Code 03 -->
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-100">
            <span class="text-xl font-bold text-gray-800">Sample Code 03</span>
            <div>
                <button id="previewButton3" onclick="showPreview3()" class="px-4 py-2 text-gray-600 bg-orange-500 text-white rounded-l-lg font-medium focus:outline-none hover:bg-orange-600">Preview</button>
                <button id="codeButton3" onclick="showCode3()" class="px-4 py-2 text-gray-600 bg-gray-200 rounded-r-lg font-medium focus:outline-none hover:bg-gray-300">Code</button>
            </div>
        </div>

        <div class="p-8 h-80 overflow-auto">
            <!-- Query Output -->
            <div id="previewSection3" class="text-gray-800">
                <h3 class="text-[28px] font-bold mb-4">Customer Orders After 2023-10-01</h3>
                <table class="table-auto w-full text-left bg-gray-50 rounded-lg shadow-md">
                    <thead>
                        <tr class="bg-purple-100">
                            <th class="px-4 py-2">Order ID</th>
                            <th class="px-4 py-2">Customer</th>
                            <th class="px-4 py-2">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border px-4 py-2">102</td>
                            <td class="border px-4 py-2">Jane Smith</td>
                            <td class="border px-4 py-2">2023-10-02</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Query Code -->
            <div id="codeSection3" class="hidden bg-gray-900 text-white p-4 rounded-lg overflow-auto">
                <pre class="text-sm text-left whitespace-pre-wrap leading-relaxed">
SELECT order_id, customer_name, order_date
FROM orders
WHERE order_date > '2023-10-01'
ORDER BY order_date;
                </pre>
            </div>
        </div>

        <!-- Tag Definitions for Sample Code 03 -->
        <div class="p-6 bg-gray-100 rounded-b-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Tag Definitions</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li><code>order_date > '2023-10-01'</code> - Filters results to show orders after a specific date.</li>
                <li><code>ORDER BY</code> - Sorts the results by the specified column.</li>
                <li><code>SELECT</code> - Retrieves specified columns from the database.</li>
            </ul>
        </div>
    </div>
</div>
<!-- Preview and Code Ends -->

<!-- References -->
<div class="max-w-5xl mx-auto p-6 space-y-12 mb-16">
    <!-- Section Title -->
    <h2 class="text-4xl font-extrabold text-center text-green-400">Database Learning Resources</h2>
    <p class="text-center text-gray-600 text-lg">Explore these resources to kickstart your HTML journey!</p>
    
    <!-- YouTube Playlists Section -->
    <div class="bg-gray-100 rounded-lg shadow-lg p-6">
        <h3 class="text-2xl font-semibold text-blue-600 mb-4">📺 Database YouTube Playlists</h3>
        <p class="text-gray-700 mb-6">Learn HTML from some of the best YouTube playlists curated for beginners:</p>
        
        <div class="space-y-4">
            <!-- YouTube Link 1 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-blue-50 transition">
                <span class="text-blue-500 text-2xl mr-4">▶️</span>
                <a href="https://youtube.com/playlist?list=PLRAV69dS1uWTaoxyeBbKpAEF90i4ijUQZ&si=-JNK9sFO11vC6q8x" class="text-lg font-medium text-blue-600 hover:underline">Chai aur Code Database Playlist</a>
            </div>

            <!-- YouTube Link 2 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-blue-50 transition">
                <span class="text-blue-500 text-2xl mr-4">▶️</span>
                <a href="https://youtu.be/hlGoQC332VM?si=ez1UuFT8h2sfOmpo" class="text-lg font-medium text-blue-600 hover:underline">Apna College Database One Shot</a>
            </div>
        </div>
    </div>

    <!-- Practice Worksheets Section -->
    <div class="bg-gray-100 rounded-lg shadow-lg p-6 ">
        <h3 class="text-2xl font-semibold text-yellow-500 mb-4">📝 Database Practice Worksheets</h3>
        <p class="text-gray-700 mb-6">Enhance your skills with these practical worksheets:</p>
        
        <div class="space-y-4">
            <!-- Worksheet Link 1 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-yellow-50 transition">
                <span class="text-yellow-400 text-2xl mr-4">📄</span>
                <a href="https://www.w3resource.com/sql-exercises/" class="text-lg font-medium text-yellow-500 hover:underline">Database Practice Worksheet</a>
            </div>

            <!-- Worksheet Link 2 -->
            <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-yellow-50 transition">
                <span class="text-yellow-400 text-2xl mr-4">📄</span>
                <a href="https://ia601403.us.archive.org/32/items/deitel-java-como-programar-6a-edicao-br-completo/SQL%20Practice%20Problems_%2057%20beginning%2C%20intermediate%2C%20and%20advanced%20challenges%20for%20you%20to%20solve%20using%20a%20%26quot%3Blearn-by-doing%26quot%3B%20approach%20%28%20PDFDrive%20%29.pdf" class="text-lg font-medium text-yellow-500 hover:underline">Database Practice Worksheet</a>
            </div>
        </div>
    </div>
</div>
<!-- References Ends-->

<!-- Summarize and Redirection -->
<div class="max-w-5xl mx-auto p-6 space-y-12">

    <!-- Summary of Database Learnings -->
    <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center text-orange-500 mb-6 ">Summary of Database Learnings</h2>
        <p class="text-gray-700 text-center text-lg mb-4 font-semibold">
            Congratulations on completing the Database module! Here's a recap of what you've learned:
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all">
                <h3 class="text-xl font-semibold text-green-600">Data Storage and Tables</h3>
                <p class="text-gray-600 mt-2">Understand how databases store data in tables, with rows representing individual records and columns representing attributes of the data.</p>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all">
                <h3 class="text-xl font-semibold text-green-600">SQL Queries</h3>
                <p class="text-gray-600 mt-2">Learn how to use SQL to retrieve, insert, update, and delete data with commands like <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code>.</p>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all ">
                <h3 class="text-xl font-semibold text-green-600">Relationships and Joins</h3>
                <p class="text-gray-600 mt-2">Understand relationships between tables and learn how to use JOINs to combine data from multiple tables, using primary and foreign keys.</p>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition hover:scale-105 transition-all">
                <h3 class="text-xl font-semibold text-green-600">Database Normalization</h3>
                <p class="text-gray-600 mt-2">Learn the principles of normalization to organize data efficiently, reduce redundancy, and ensure data integrity within relational databases.</p>
            </div>
        </div>
    </div>

    <!-- Database Course Call-to-Action Section -->
    <div class="bg-white rounded-lg shadow-lg p-10 mt-10 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-blue-500 opacity-30"></div>
        <h2 class="text-3xl font-bold text-pink-700 relative z-10 mb-4">Congratulations on Completing the Fundamentals of Web Development!</h2>
        <p class="text-gray-700 font-semibold relative z-10 text-lg mb-6">You've mastered the essentials and are now ready to take your skills to the next level. Claim your certificate to celebrate your achievement!</p>
    
        <a href="" class="relative z-10 inline-block bg-orange-300 text-white font-semibold px-5 py-2 rounded-lg text-md hover:bg-green-500 transition-all">
            Download Certificate
        </a>
    
        <div class="absolute bottom-0 right-0 transform translate-x-8 translate-y-8 opacity-10 z-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-48 h-48 text-pink-600" viewBox="0 0 24 24">
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
                dot.classList.toggle('bg-green-500', index === activeSlide); 
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
        document.getElementById('previewButton1').classList.add('bg-orange-500', 'text-white');
        document.getElementById('previewButton1').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('codeButton1').classList.remove('bg-orange-500', 'text-white');
        document.getElementById('codeButton1').classList.add('bg-gray-200', 'text-gray-600');
    }

    function showCode1() {
        document.getElementById('codeSection1').classList.remove('hidden');
        document.getElementById('previewSection1').classList.add('hidden');
        document.getElementById('codeButton1').classList.add('bg-orange-500', 'text-white');
        document.getElementById('codeButton1').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('previewButton1').classList.remove('bg-orange-500', 'text-white');
        document.getElementById('previewButton1').classList.add('bg-gray-200', 'text-gray-600');
    }

    // Functions for Sample Code 02
    function showPreview2() {
        document.getElementById('previewSection2').classList.remove('hidden');
        document.getElementById('codeSection2').classList.add('hidden');
        document.getElementById('previewButton2').classList.add('bg-orange-500', 'text-white');
        document.getElementById('previewButton2').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('codeButton2').classList.remove('bg-orange-500', 'text-white');
        document.getElementById('codeButton2').classList.add('bg-gray-200', 'text-gray-600');
    }

    function showCode2() {
        document.getElementById('codeSection2').classList.remove('hidden');
        document.getElementById('previewSection2').classList.add('hidden');
        document.getElementById('codeButton2').classList.add('bg-orange-500', 'text-white');
        document.getElementById('codeButton2').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('previewButton2').classList.remove('bg-orange-500', 'text-white');
        document.getElementById('previewButton2').classList.add('bg-gray-200', 'text-gray-600');
    }

    // Functions for Sample Code 03
    function showPreview3() {
        document.getElementById('previewSection3').classList.remove('hidden');
        document.getElementById('codeSection3').classList.add('hidden');
        document.getElementById('previewButton3').classList.add('bg-orange-500', 'text-white');
        document.getElementById('previewButton3').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('codeButton3').classList.remove('bg-orange-500', 'text-white');
        document.getElementById('codeButton3').classList.add('bg-gray-200', 'text-gray-600');
    }

    function showCode3() {
        document.getElementById('codeSection3').classList.remove('hidden');
        document.getElementById('previewSection3').classList.add('hidden');
        document.getElementById('codeButton3').classList.add('bg-orange-500', 'text-white');
        document.getElementById('codeButton3').classList.remove('bg-gray-200', 'text-gray-600');
        document.getElementById('previewButton3').classList.remove('bg-orange-500', 'text-white');
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