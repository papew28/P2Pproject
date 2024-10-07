package code;

import java.io.IOException;

import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class GreetingServlet extends HttpServlet {

	 @Override
	    protected void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
	        response.setContentType("text/html");
	        PrintWriter out = response.getWriter();
	        String docType = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\n";
	        String title = "<H1> Tenter votre chance à cette loterie virtuelle!</H1>\n";
	        
	        out.println(docType +
	                    "<HTML>\n" +
	                    "<HEAD><TITLE>Greetings Servlet</TITLE></HEAD>\n" +
	                    "<BODY BGCOLOR=\"#135D66\">\n" +
	                    title +
	                    "<FORM ACTION = \"Hello\" METHOD=\"post\">\n" +
	                    "Votre nom svp: <INPUT TYPE = \"TEXT\" NAME = \"nom\"><BR>\n" +
	                    "<BR>\n" +
	                    "<CENTER><INPUT TYPE = \"SUBMIT\" NAME = \"Submit Query\"></CENTER>\n" +
	                    "</FORM>\n" +
	                    "</BODY></HTML>");
	    }

	    @Override
	    protected void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
	        response.setContentType("text/html");
	        PrintWriter out = response.getWriter();
	        
	        String nom = request.getParameter("nom");
	        double montant=(Math.random() * 10);
	        String nomPrenom = "Anonymous";
	        
	        Winner winner=new Winner(nom, montant);
	    	ServicesImpl services = new ServicesImpl();
	    	services.save(winner);
	        
	        if (nom != null)
	            nomPrenom = nom.toUpperCase();
	        
	        String docType = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\n";
	        String title = "<H1>Greetings " + nomPrenom + "!</H1>\n";
	        
	        out.println(docType +
	                    "<HTML>\n" +
	                    "<HEAD><TITLE>Greetings Servlet</TITLE></HEAD>\n" +
	                    "<BODY BGCOLOR=\"#135D66\">\n" +
	                    title +
	                    "Vous avez gagné: " + montant + " millions de dollars!\n" +
	                    "</BODY></HTML>");
	    }

}