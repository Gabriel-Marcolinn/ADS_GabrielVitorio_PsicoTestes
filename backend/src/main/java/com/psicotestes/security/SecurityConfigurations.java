package com.psicotestes.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfigurations {

    private final SecurityFilter securityFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(Customizer.withDefaults())
                // Desabilita o CSRF (Cross-Site Request Forgery) pois o JWT já nos protege contra isso
                .csrf(csrf -> csrf.disable())
                // Diz ao Spring que a nossa autenticação é STATELESS (não guardaremos sessão em memória) cada requisição é independente e deve trazer o Token
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Configura as regras de acesso das rotas
                .authorizeHttpRequests(authorize -> authorize
                        // Libera preflight CORS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Arquivos estáticos do frontend (React build)
                        .requestMatchers("/", "/index.html", "/assets/**", "/*.js", "/*.css", "/*.svg", "/*.ico", "/*.png", "/*.webp").permitAll()
                        // A rota de Login DEVE ser pública
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/empresas").authenticated()
                        .requestMatchers("/api/empresas").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/usuarios").authenticated()
                        .requestMatchers("/api/usuarios").hasAnyRole("ADMIN","PSICOLOGO_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/aplicacoes").authenticated()
                        .requestMatchers( "/api/aplicacoes").hasAnyRole("PSICOLOGO_ADMIN","PSICOLOGO")
                        .requestMatchers(HttpMethod.GET, "/api/pacientes").authenticated()
                        .requestMatchers( "/api/pacientes").hasAnyRole("PSICOLOGO_ADMIN","PSICOLOGO")
                        .requestMatchers(HttpMethod.GET, "/api/dashboard/admin").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/dashboard/psicologoadmin/**").hasRole("PSICOLOGO_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/dashboard/psicologo/**").hasRole("PSICOLOGO")
                        // Qualquer outra rota não mapeada acima precisará do Token JWT (estar autenticado)
                        .anyRequest().authenticated()
                )
                // Adiciona o nosso Filtro ANTES do filtro padrão do Spring
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // Criamos o gerenciador explicitamente, ligando o seu UserDetailsService com o BCrypt
    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(provider);
    }

    // Configura o algoritmo de criptografia de senhas (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}