package code;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ServicesImpl extends AbstractDAOA implements Services {
	@Override
	public Winner consulter(String nom) {
	    PreparedStatement pst = null;
	    ResultSet rs = null;
	    String sql = "SELECT nom, montant FROM winners WHERE nom=?";
	    Winner winner = null;

	    try {
	        pst = connection.prepareStatement(sql);
	        pst.setString(1, nom);
	        rs = pst.executeQuery();

	        if (rs.next()) {
	            String founded_name = rs.getString("nom");
	            double montant = rs.getDouble("montant");
	            winner = new Winner(founded_name, montant);
	        }
	    } catch (SQLException exp) {
	        System.out.println("Erreur lors de l'exécution de la requête : " + exp.getMessage());
	    } finally {
	        try {
	            if (rs != null) {
	                rs.close();
	            }
	            if (pst != null) {
	                pst.close();
	            }
	        } catch (SQLException e) {
	            System.out.println("Erreur lors de la fermeture des ressources : " + e.getMessage());
	        }
	    }

	    return winner;
	}


	 @Override
	    public void save(Winner winner) {
	        PreparedStatement pst = null;
	        String sql = "INSERT INTO winners (nom, montant) VALUES (?, ?)";
	        try {
	            pst = connection.prepareStatement(sql);
	            pst.setString(1, winner.getNom());
	            pst.setDouble(2, winner.getMontant()); 
	            pst.executeUpdate();
	        } catch (SQLException exp) {
	            System.out.println(exp.getMessage());
	        } finally {
	            
	            try {
	                if (pst != null)
	                    pst.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	 
	   
}
