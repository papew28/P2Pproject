package exple1;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.io.PrintWriter;

public class Blacklister extends HttpFilter implements Filter {
	
	private String[] blacklist = {"cisse", "pape", "waly"};
       
   
    public Blacklister() {
        super();
        // TODO Auto-generated constructor stub
    }

	public void destroy() {
		// TODO Auto-generated method stub
	}

	
	 @Override
	    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	            throws IOException, ServletException {
	        HttpServletRequest httpRequest = (HttpServletRequest) request;
	        String username = httpRequest.getParameter("nom");

	       
	        if (isBlacklisted(username)) {
	        	PrintWriter out = response.getWriter();
	        	
	        	String docType = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\n";
	        	String title = "<H1>ACCES REFUSE !!!!!</H1>\n";
	        	out.println(docType + "<HTML>\n" + "<HEAD><TITLE>Accès Refusé</TITLE></HEAD>\n" + "<BODY BGCOLOR=\"#E72929\">\n"
	        	        + title + "</BODY></HTML>");
	        	out.println("ACCES REFUSE pour " + username + ". Vous Etes sur la liste noire.");
	            return;
	        }

	       
	        chain.doFilter(request, response);
	    }

	    private boolean isBlacklisted(String username) {
	        for (String blacklistedUser : blacklist) {
	            if (blacklistedUser.equals(username)) {
	                return true;
	            }
	        }
	        return false;
	    }


	
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
