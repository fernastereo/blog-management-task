Collecting workspace information

# Project Documentation

## Project Overview

This project is a blog management application built with Vue 3 and Vite. It allows users to view, create, edit, and delete blog posts using [JSON Placeholder API](https://jsonplaceholder.typicode.com/). The application is designed to be responsive and user-friendly, providing a seamless experience for managing blog content.

The project is deployed through GitHub Pages and can be accessed at [https://fernastereo.github.io/blog-management-task/](https://fernastereo.github.io/blog-management-task/).

## Design Decisions

### Component-Based Architecture

The project follows a component-based architecture, which is a core principle of Vue.js. This approach allows for better code organization, reusability, and maintainability. Key components include:

- NavBar.vue: The navigation bar component.
- SearchBar.vue: The search bar component for filtering posts.
- ResultsPaginator.vue: The pagination component for navigating through posts.
- ModalPost.vue: The modal component for creating and editing posts.
- ModalDeletePost.vue: The modal component for deleting posts.
- SpinnerLoading.vue: The loading spinner component.
- PostComments.vue: The component for displaying comments on a post.

### State Management with Pinia

The project uses Pinia for state management. Pinia is a lightweight and intuitive state management library for Vue.js. It provides a simple API for managing the application's state, making it easier to handle complex state logic. The `postStore` is used to manage the state related to blog posts.

### Routing with Vue Router

Vue Router is used for client-side routing. It allows for navigation between different views of the application, such as the list view, details view, and post view. The routes are defined in index.js.

### Pagination

The usePagination composable is used to handle pagination logic. It provides reactive properties and methods for managing pagination, such as currentPage, totalPages, nextPage, and prevPage. This composable is used in the ListView.vue and DetailsView.vue components to paginate the list of posts.

### API Integration

The application fetches data from the [JSON Placeholder API](https://jsonplaceholder.typicode.com/). The base URL for the API is stored in environment variables, and the `postStore` contains methods for fetching, creating, updating, and deleting posts. The fetchPostsWithUserNames and fetchSinglePostWithUserName methods are used to fetch posts and their associated user names.

### Styling with Tailwind CSS

Tailwind CSS is used for styling the application. It provides a utility-first approach to styling, allowing for rapid development and a consistent design. The Tailwind configuration is defined in tailwind.config.js, and the styles are imported in style.css.

## Additional Technologies

- **Vite**: A fast build tool and development server for modern web projects. It provides a smooth development experience with features like hot module replacement (HMR).
- **ESLint**: A tool for identifying and fixing linting issues in the codebase. The configuration is defined in eslint.config.js.
- **Prettier**: A code formatter that ensures consistent code style across the project. The configuration is defined in .prettierrc.json

## Project Setup

To set up the project, follow these steps:

1. Install dependencies:
   ```sh
   npm install
   ```

2. Compile and hot-reload for development:
   ```sh
   npm run dev
   ```

3. Compile and minify for production:
   ```sh
   npm run build
   ```

4. Lint the code with ESLint:
   ```sh
   npm run lint
   ```
