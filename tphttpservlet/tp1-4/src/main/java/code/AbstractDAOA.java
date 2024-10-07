package code;

import java.sql.Connection;

public class AbstractDAOA {
    protected Connection connection = SingleConnexion.getConnection();
}