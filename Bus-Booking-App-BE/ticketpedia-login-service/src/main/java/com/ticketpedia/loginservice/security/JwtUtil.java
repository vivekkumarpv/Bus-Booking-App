package com.ticketpedia.loginservice.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private Long expiration;

	public String generateToken(String username) {
		return createToken(new HashMap<>(), username);
	}

	private String createToken(Map<String, Object> claims, String subject) {
		Date now = new Date();
		Date expirationDate = new Date(now.getTime() + expiration);

		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(now).setExpiration(expirationDate)
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	public Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public Boolean validateToken(String token, String username) {
		String tokenUsername = extractClaim(token, Claims::getSubject);
		return (tokenUsername.equals(username) && !isTokenExpired(token));
	}
}
