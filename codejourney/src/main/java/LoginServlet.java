import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
       
        // Set response content type
        response.setContentType("text/html;charset=UTF-8");

        // Check if the email or password is empty
        if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
            request.setAttribute("error", "Please enter both email and password.");
            request.getRequestDispatcher("index.jsp").forward(request, response);
            return;
        }

        // Try connecting to the database and verifying credentials
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "SELECT * FROM users WHERE email = ? AND password = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, email);
                pstmt.setString(2, password);  // Comparing password in plain text
                System.out.println("Executing query: " + sql);

                try (ResultSet rs = pstmt.executeQuery()) {
                	if (rs.next()) {
                	    // User found, start a session and store the user details
                	    HttpSession session = request.getSession();
                	    session.setAttribute("userName", rs.getString("username")); // Make sure to get the correct field from the DB
                
                	    response.sendRedirect("dashboard.jsp");
                	} else {
                	    // Invalid credentials
                	    request.setAttribute("error", "Invalid email or password.");
                	    request.getRequestDispatcher("index.jsp").forward(request, response);
                	}

                }
            } catch (SQLException e) {
                // SQL error
                log("Database error", e);  // Log the exception
                request.setAttribute("error", "An error occurred while processing your request. Please try again later.");
                request.getRequestDispatcher("index.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            // Database connection error
            log("Database connection error", e);  // Log the exception
            request.setAttribute("error", "Could not connect to the database. Please try again later.");
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("index.jsp");
    }
}
