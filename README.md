markdown
# Code Journey 

## Description
This platform aims to serve as a comprehensive platform for anyone aspiring to become a web developer. It provides detailed guidance on web development, from foundational knowledge to advanced skills, helping users transition from beginners to proficient developers. The website features learning paths, study materials, and various resources on topics like HTML, CSS, JavaScript, frameworks, databases, and more.

## Features
- User Registration 
- Backend processing 
- Responsive and modern UI using TailwindCSS.
- Learning Resources
- Structured Learning Paths
- Community and Collaboration
- Certifications and Rewards

## Project Setup

### Prerequisites
- Java 8 or above
- Maven
- A Servlet-compatible container (e.g., Apache Tomcat)

### Installation

1. **Clone the repository** (or download the zip):
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd codejourney
   ```

3. **Build the project using Maven**:
   ```bash
   mvn clean install
   ```

4. **Deploy the application**:
   - Copy the generated `.war` file from the `target` directory.
   - Deploy it to your servlet container (e.g., Tomcat).

### Running the Application
1. Start your Tomcat server (or your preferred servlet container).
2. Open a web browser and visit:
   ```
   http://localhost:8082/codejourney
   ```

### Form Fields
- **Username**: User's chosen name.
- **Email**: User's email address.
- **Phone**: User's phone number.
- **Password**: User's chosen password.
- **Accept**: User agrees to the terms and privacy policy.

## Backend (Servlet Handling)
The form data is processed by the `RegisterServlet` where the backend retrieves form parameters using `request.getParameter()`.

### Example Servlet Code
```java
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String password = request.getParameter("password");
        String accept = request.getParameter("accept");

        // Process data (e.g., store in database)
        if (username != null && email != null && phone != null && password != null && accept != null) {
            response.getWriter().write("Registration successful!");
        } else {
            response.getWriter().write("Registration failed. Please check the inputs.");
        }
    }
}
```

## Frontend
The frontend uses TailwindCSS to create a responsive and simple registration form.

### Example HTML Form
```html
<form action="register" method="POST">
    <label for="username">Username</label>
    <input type="text" name="username" id="username" required>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
    <label for="phone">Phone</label>
    <input type="text" name="phone" id="phone" required>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>
    <input type="checkbox" name="accept" required>
    <button type="submit">Create Account</button>
</form>
```

## Contributions
We would like to thank the following contributors for their contributions to this project:

- **Yashwardhan Nigam** - UI / UX & Front End Developer
- **Akshat Mahajan** - Lead Front End Developer
- **Nipun Gujrati** - Backend Developer

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or suggestions, feel free to contact us at:

- Email: support@codejourney.com
- GitHub: [Github Link](https://github.com/akshatmhjj/Code-Journey)

```
