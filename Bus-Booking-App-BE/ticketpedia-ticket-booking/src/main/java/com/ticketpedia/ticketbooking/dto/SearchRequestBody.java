package com.ticketpedia.ticketbooking.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequestBody {
	public List<RouteDetail> routeDetailList;
	public String category;
}
