package code;

public class Winner {
	
	private String nom;
	
	private double montant;

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public double getMontant() {
		return montant;
	}

	public void setMontant(double montant) {
		this.montant = montant;
	}

	public Winner(String nom, double montant) {
		this.nom = nom;
		this.montant = montant;
	}
	

}
