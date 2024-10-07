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
public void doGet(HttpServletRequest request,HttpServletResponse response)throws ServletException, IOException {
	
}
public void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
	

	String nom=request.getParameter("nom");
	double montant= Math.random() * 10;
	
	Winner winner=new Winner(nom, montant);
	ServicesImpl services = new ServicesImpl();
	services.save(winner);
	
	response.setContentType("text/html");
	PrintWriter out = response.getWriter();
	String docType = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\n";
	String nomPrenom="";
	String title;
	if (nom != null)
	     nomPrenom += nom.toUpperCase();
	title = "<H1>Greetings " + nomPrenom + "!</H1>\n";
	out.println(docType + "<HTML>\n" + "<HEAD><TITLE>Greetings Servlet</TITLE></HEAD>\n" + "<BODY BGCOLOR=\"#FDF5E6\">\n"
	        + title + "</BODY></HTML>");
	out.println("Vous avez gagne: "+ montant);
	out.println(" millions de dollars!");
}

}