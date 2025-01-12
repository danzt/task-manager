describe("Login Page", () => {
  before(() => {
    // Simula el registro de un usuario en localStorage
    const users = [
      {
        username: "Admin",
        email: "admin@example.com",
        password: "admin123",
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  });

  it("Debe permitir iniciar sesión con credenciales válidas", () => {
    cy.visit("/auth/login");

    // Usa las credenciales simuladas
    cy.get('input[formcontrolname="email"]').type("admin@example.com", {
      force: true,
    });
    cy.get('input[formcontrolname="password"]').type("admin123", {
      force: true,
    });
    cy.get('button[type="submit"]').click();

    // Verifica redirección al dashboard
    cy.url({ timeout: 10000 }).should("include", "/dashboard");
    cy.contains("Bienvenido al Dashboard");
  });
});
