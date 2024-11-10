<%@ page session="true" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String userEmail = (String) session.getAttribute("userEmail");
    String userName = (String) session.getAttribute("userName");
    if (userEmail == null && userName == null) {
    	response.sendRedirect("index.jsp");
        return;
    }
    else
    	request.setAttribute("userName", userName); 
    
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
    <title>Code Journey</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="icon" type="image/png" href="./Images/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="./Images/favicon.svg" />
    <link rel="shortcut icon" href="./Images/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="./Images/apple-touch-icon.png" />
    <link rel="manifest" href="./Images/site.webmanifest" />
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
<body>

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
                    <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
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
                <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
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
                    <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
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
                <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
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
    
        <!-- Collapsible Skill Sections -->
        <!-- <div class="mb-8 space-y-4">
            <button class="w-full text-left bg-gradient-to-r from-stone-500 to-stone-700 p-4 font-semibold rounded-md flex items-center justify-between text-gray-800 transition" onclick="toggleSkill('htmlSkills', 'htmlArrow')">
                <span>HTML</span>
                <svg class="h-4 w-4 transition-transform" id="htmlArrow" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
            </button>
            <div id="htmlSkills" class="collapsible-content">
                <p class="p-4 text-gray-800 font-semibold bg-gradient-to-r from-stone-400 to-stone-600 rounded">HTML5, Semantic HTML, Forms</p>
            </div>
    
            <button class="w-full text-left bg-gradient-to-r from-teal-200 to-teal-500 p-4 font-semibold rounded-md flex items-center justify-between text-gray-800 transition" onclick="toggleSkill('cssSkills', 'cssArrow')">
                <span>CSS</span>
                <svg class="h-4 w-4 transition-transform" id="cssArrow" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
            </button>
            <div id="cssSkills" class="collapsible-content">
                <p class="p-4 text-gray-800 font-semibold bg-gradient-to-r from-teal-100 to-teal-400 rounded">Flexbox, Grid, Animations</p>
            </div>
        </div> -->
    
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
                    <a href="html.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-white hover:px-1">HTML</a>
                    <a href="css.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-white hover:px-1">CSS</a>
                    <a href="js.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-white hover:px-1">JavaScript</a>
                    <a href="db.jsp" class="block text-base font-semibold leading-7 text-gray-900 transition-all hover:text-white hover:px-1">Databases</a>
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
<div class="relative isolate px-6 pt-8 lg:px-8 bg-gradient-to-r from-violet-200 to-pink-100">
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-36">
        <!-- Announcement Section -->
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 hover:bg-gray-300 transition-all duration-300 ease-in-out">
                How to be a Web Developer? 
                <a href="#Second-Section" class="font-semibold text-indigo-600 ">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    Read more <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
        </div>
        
        <!-- Hero Section (Main Content) -->
        <div class="text-center">
            <h1 class="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                Start Your Journey to Become a <br/> Web Developer
            </h1>
            <p class="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                From beginner to expert, learn the skills you need to build modern, responsive websites and applications.
            </p>
            
            <!-- Call-to-Action Buttons -->
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <a href="#First-Section" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 ease-in-out">
                    Get started
                </a>
                <a href="#" id="openModal" class="text-sm font-semibold leading-6 text-gray-900 transition-all hover:text-blue-500 hover:scale-110">
                    Browse Courses <span aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    </div>
</div>
<!-- Hero Section Ends-->

<!-- Modal -->
<div id="modal" class="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background backdrop with blur effect -->
    <div id="modalBackdrop" class="fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity duration-300 ease-out opacity-0 backdrop-blur-none" aria-hidden="true"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <div id="modalPanel" class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg opacity-0 translate-y-4 sm:scale-95">

            <div class="relative z-10 grid grid-cols-2 gap-10 p-4" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <!-- HTML Section -->
                <div class="card bg-white rounded-lg shadow-lg p-4">
                    <div class="flex items-start">
                        <div class="icon bg-red-100 rounded-full p-3">
                            <!-- HTML Icon -->
                            <svg class="h-6 w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>file_type_html</title><polygon points="5.902 27.201 3.655 2 28.345 2 26.095 27.197 15.985 30 5.902 27.201" style="fill:#e44f26"/><polygon points="16 27.858 24.17 25.593 26.092 4.061 16 4.061 16 27.858" style="fill:#f1662a"/><polygon points="16 13.407 11.91 13.407 11.628 10.242 16 10.242 16 7.151 15.989 7.151 8.25 7.151 8.324 7.981 9.083 16.498 16 16.498 16 13.407" style="fill:#ebebeb"/><polygon points="16 21.434 15.986 21.438 12.544 20.509 12.324 18.044 10.651 18.044 9.221 18.044 9.654 22.896 15.986 24.654 16 24.65 16 21.434" style="fill:#ebebeb"/><polygon points="15.989 13.407 15.989 16.498 19.795 16.498 19.437 20.507 15.989 21.437 15.989 24.653 22.326 22.896 22.372 22.374 23.098 14.237 23.174 13.407 22.341 13.407 15.989 13.407" style="fill:#fff"/><polygon points="15.989 7.151 15.989 9.071 15.989 10.235 15.989 10.242 23.445 10.242 23.445 10.242 23.455 10.242 23.517 9.548 23.658 7.981 23.732 7.151 15.989 7.151" style="fill:#fff"/></svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-bold text-gray-900">HTML</h3>
                            <p class="text-sm text-gray-500">The standard markup language used to create and structure web pages...</p>
                            <a href="html.jsp">
                                <button class="mt-2 inline-flex justify-center rounded-md bg-slate-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">Know More</button>
                            </a>
                        </div>
                    </div>
                </div>
            
                <!-- CSS Section -->
                <div class="card bg-white rounded-lg shadow-lg p-4">
                    <div class="flex items-start">
                        <div class="icon bg-blue-100 rounded-full p-3">
                            <!-- CSS Icon -->
                            <svg class="h-6 w-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#1172B8"/>
                                <path d="M26 5H16V29.5L24 27L26 5Z" fill="#33AADD"/>
                                <path d="M19.5 17.5H9.5L9 14L17 11.5H9L8.5 8.5H24L23.5 12L17 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5Z" fill="white"/>
                                </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-bold text-gray-900">CSS</h3>
                            <p class="text-sm text-gray-500">A stylesheet language that controls the presentation of HTML...</p>
                            <a href="css.jsp">
                                <button class="mt-2 inline-flex justify-center rounded-md bg-slate-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">Know More</button>
                            </a>
                        </div>
                    </div>
                </div>
            
                <!-- JavaScript Section -->
                <div class="card bg-white rounded-lg shadow-lg p-4">
                    <div class="flex items-start">
                        <div class="icon bg-gray-100 rounded-full p-3">
                            <!-- JS Icon -->
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 6C13 5.44772 13.4477 5 14 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H15.2C15.0895 7 15 7.08954 15 7.2V8.8C15 8.91046 15.0895 9 15.2 9H17C17.5523 9 18 9.44772 18 10V13C18 13.2652 17.8946 13.5196 17.7071 13.7071L14.7071 16.7071C14.3166 17.0976 13.6834 17.0976 13.2929 16.7071C12.9024 16.3166 12.9024 15.6834 13.2929 15.2929L15.9414 12.6444C15.9789 12.6069 16 12.556 16 12.5029V11.2C16 11.0895 15.9105 11 15.8 11H14C13.4477 11 13 10.5523 13 10V6Z" fill="#0F0F0F"/>
                                <path d="M11 6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V13.1029C9 13.2811 8.78457 13.3704 8.65858 13.2444L8.05858 12.6444C8.02107 12.6069 8 12.556 8 12.5029V12C8 11.4477 7.55228 11 7 11C6.44771 11 6 11.4477 6 12V13C6 13.2652 6.10536 13.5196 6.29289 13.7071L9.29289 16.7071C9.57889 16.9931 10.009 17.0787 10.3827 16.9239C10.7564 16.7691 11 16.4045 11 16V6Z" fill="#0F0F0F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.33617 4.42426C1.07798 2.61696 2.48037 1 4.30602 1H19.694C21.5196 1 22.922 2.61696 22.6638 4.42426L21.0948 15.4074C20.9933 16.1178 20.6405 16.7683 20.1005 17.2409L13.9755 22.6002C12.8444 23.5899 11.1556 23.5899 10.0245 22.6002L3.89952 17.2409C3.35945 16.7683 3.00667 16.1178 2.90519 15.4074L1.33617 4.42426ZM4.30602 3C3.69747 3 3.23001 3.53899 3.31607 4.14142L4.88509 15.1245C4.91892 15.3613 5.03651 15.5782 5.21653 15.7357L11.3415 21.095C11.7185 21.4249 12.2815 21.4249 12.6585 21.095L18.7835 15.7357C18.9635 15.5782 19.0811 15.3613 19.1149 15.1245L20.6839 4.14142C20.77 3.53899 20.3025 3 19.694 3H4.30602Z" fill="#0F0F0F"/>
                                </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-bold text-gray-900">JavaScript</h3>
                            <p class="text-sm text-gray-500">A programming language for adding interactive functionality...</p>
                            <a href="js.jsp">
                                <button class="mt-2 inline-flex justify-center rounded-md bg-slate-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500">Know More</button>
                            </a>
                        </div>
                    </div>
                </div>
            
                <!-- Database Section -->
                <div class="card bg-white rounded-lg shadow-lg p-4">
                    <div class="flex items-start">
                        <div class="icon bg-purple-200 rounded-full p-3">
                            <!-- Database Icon -->
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 10C16.4183 10 20 8.20914 20 6C20 3.79086 16.4183 2 12 2C7.58172 2 4 3.79086 4 6C4 8.20914 7.58172 10 12 10Z" fill="#1C274C"/>
                                <path opacity="0.5" d="M4 12V18C4 20.2091 7.58172 22 12 22C16.4183 22 20 20.2091 20 18V12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12Z" fill="#1C274C"/>
                                <path opacity="0.7" d="M4 6V12C4 14.2091 7.58172 16 12 16C16.4183 16 20 14.2091 20 12V6C20 8.20914 16.4183 10 12 10C7.58172 10 4 8.20914 4 6Z" fill="#1C274C"/>
                                </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-bold text-gray-900">Database (DB)</h3>
                            <p class="text-sm text-gray-500">A structured system for storing, managing, and retrieving data...</p>
                            <a href="db.jsp">
                                <button class="mt-2 inline-flex justify-center rounded-md bg-slate-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500">Know More</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<!-- Modal Ends -->

<!-- Login Modal -->
<div id="loginModal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300">
    <div id="loginModalPanel" class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4 sm:mx-0 opacity-0 translate-y-4 scale-95 transition-all duration-300">

        <button id="closeLoginModal" class="absolute top-5 right-5 text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div class="flex items-center justify-center mt-5 mb-6 text-3xl font-bold text-gray-900">
            <img class="w-12 h-12 mr-4 rounded-xl" src="Images/CJ.jpg" alt="Code Journey Logo">
            <span>Code Journey</span>
        </div>
        <h1 class="text-xl font-semibold text-center text-gray-900 mb-4">Sign in to your account</h1>
        <form class="space-y-6" action="#">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Your email</label>
                <input type="email" id="email" name="email" placeholder="name@company.com" required class="w-full px-4 py-2 mt-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" placeholder="••••••••" required class="w-full px-4 py-2 mt-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex justify-end">
                <a href="#" class="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" class="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign in</button>
            <p class="text-center text-sm text-gray-500">
                Don't have an account? <a href="sign-up.html" class="text-blue-600 hover:underline">Sign up</a>
            </p>
        </form>
    </div>
</div>
<!-- Login Modal Ends -->

<!-- First Section -->
<div id="First-Section" class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 w-full">
    <!-- BG PATTERN -->
        <div class="absolute inset-0 -z-10 overflow-hidden">
        <svg class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-300 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
            <defs>
            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
            <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
        </div>
    <!-- BG PATTERN -->
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="lg:pr-4">
            <div class="lg:max-w-lg">
                <p class="text-base font-semibold leading-7 text-indigo-600">Get Started</p>
                <h1 class="mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">What is Web Development ?</h1>
                <p class="mt-6 text-xl leading-8 text-gray-700">Web development is the process of building websites and web applications that people can access through the internet or a private network (intranet). It involves using a variety of skills and technologies to create websites that are functional, interactive, and visually attractive for users.</p>
            </div>
            </div>
        </div>
        <div class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img class="w-[38rem] h-100 max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[47rem]" src="./Images/WEB DEV'.jpg" alt="">
        </div>
        <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="lg:pr-4">
            <div class="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>Web development includes designing the layout, adding interactive features, managing data, and making sure everything works properly behind the scenes. The goal is to create websites that people can easily use and enjoy interacting with.</p>
                <ul role="list" class="mt-8 space-y-8 text-gray-600">
                <li class="flex gap-x-3">
                    <svg class="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clip-rule="evenodd" />
                    </svg>
                    <span><strong class="font-semibold text-gray-900">Front-End Development (Client-Side) -</strong> This involves the development of the visual and interactive elements of a website that users directly engage with.</span>
                </li>
                <li class="flex gap-x-3">
                    <svg class="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
                    </svg>
                    <span><strong class="font-semibold text-gray-900">Back-End Development (Server-Side) -</strong> Back-end development refers to the "behind-the-scenes" activities that happen on the server, ensuring that the website works as intended.</span>
                </li>
                <li class="flex gap-x-3">
                    <svg class="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                    <path fill-rule="evenodd" d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clip-rule="evenodd" />
                    </svg>
                    <span><strong class="font-semibold text-gray-900">Full-Stack Development -</strong> Full-stack developers are skilled in both front-end and back-end technologies. They can handle the entire web development process, from designing the user interface to managing databases and server operations.</span>
                </li>
                </ul>
                <p class="mt-8">Web development powers everything from simple blogs to complex web applications like e-commerce platforms, social media, and online banking. It plays a critical role in providing users with access to information, communication tools, and digital services, making it a key aspect of our daily lives in the digital age.</p>
                <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">What does we offer ?</h2>
                <p class="mt-6">
                    • Comprehensive Learning Paths <br/>
                    • Detailed Study Materials <br/>
                    • Database & Backend Guidance <br/> 
                    • Accessible Learning Materials <br/> 
                    • Regular Updates
                </p>
            </div>
            </div>
        </div>
        </div>
</div>
<!-- First Section -->

<!-- Second Section -->
<section id="Second-Section" class="bg-gradient-to-r from-violet-200 to-pink-100">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="font-light text-gray-500 sm:text-lg ">
            <h2 class="mb-7 text-4xl tracking-tight font-bold text-gray-900 ">How to be a Web Developer ?</h2>
            <p class="mb-4 font-semibold">To become a web developer, start by learning HTML to structure web pages and CSS to style them. Then, move on to JavaScript to make websites interactive. Once you're comfortable with the basics, learn Git for version control to manage your code.</p>
            <p class="font-semibold">Practice by building simple projects and gradually add more features, focusing on making your sites look good on different devices (responsive design). Over time, keep improving by learning new tools and frameworks.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1">
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2">
        </div>
    </div>
</section>
<!-- Second Section -->

<!-- Third Section -->
<section class="relative inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1.5px,transparent_1px)] [background-size:24px_24px]">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 ">
        <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="./Images/3rd section.jpg" alt="office content 1">
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="./Images/3rd section-2.jpg" alt="office content 2">
        </div>
        <div class="font-light text-gray-500 sm:text-lg ">
            <h2 class="mb-7 text-4xl tracking-tight font-bold text-gray-900 ">Why to be a Web Developer ?</h2>
            <p class="mb-4 font-semibold">Becoming a web developer offers many benefits and opportunities. It allows you to be creative by building websites and web applications, bringing your ideas to life. The demand for skilled web developers is high, providing job security and a wide range of career opportunities across industries.</p>
            <p class="font-semibold">Web development encourages continuous learning, keeping you updated with the latest technologies and trends. Additionally, it provides a sense of accomplishment as you create functional, user-friendly websites that people use every day.</p>
        </div>
    </div>
</section>
<!-- Third Section -->

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
        <h2 class="font-bold text-xl mt-4 text-white">Community</h2>
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

// JavaScript to handle modal toggle and transitions 
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalPanel = document.getElementById('modalPanel');

// Function to show the modal with transitions and apply background blur
function showModal() {
    modal.classList.remove('hidden'); // Show modal
    setTimeout(() => {
        // Apply transitions after a slight delay to ensure smooth transition
        modalBackdrop.classList.remove('opacity-0', 'backdrop-blur-none');
        modalBackdrop.classList.add('opacity-100', 'backdrop-blur-sm');
        modalPanel.classList.remove('opacity-0', 'translate-y-4', 'sm:scale-95');
        modalPanel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
    }, 10); // Delay to ensure CSS transition applies smoothly
}

// Function to hide the modal with transitions and remove background blur
function hideModal() {
    modalBackdrop.classList.remove('opacity-100', 'backdrop-blur-sm'); // Remove visible and blur states
    modalBackdrop.classList.add('opacity-0', 'backdrop-blur-none'); // Add hidden and non-blur states
    modalPanel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100'); // Transition for modal panel
    modalPanel.classList.add('opacity-0', 'translate-y-4', 'sm:scale-95');
    setTimeout(() => {
        modal.classList.add('hidden'); // Hide modal after transition
    }, 300); // Duration of exit transition matches the CSS duration
}

// Event listeners
openModalButton.addEventListener('click', (e) => {
    e.preventDefault();
    showModal();
});

// Close modal when clicking outside the modal panel
modal.addEventListener('click', (event) => {
        if (!modalPanel.contains(event.target)) {
            hideModal();
        }
    });

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