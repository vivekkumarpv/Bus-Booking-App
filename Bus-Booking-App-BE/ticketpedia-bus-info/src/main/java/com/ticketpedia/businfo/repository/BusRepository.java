package com.ticketpedia.businfo.repository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ticketpedia.businfo.model.Bus;

public interface BusRepository extends JpaRepository<Bus,Integer> {
	
	@Query(value="from Bus where :day MEMBER OF runsOnWeekDays AND origin=:origin AND destination=:destination")
	public List<Bus> findBusesForGivenDayOriginDestination(DayOfWeek day, String origin, String destination);
	//runsOnWeekDays in(:day) 
	
	@Query(value="from Bus where :day MEMBER OF runsOnWeekDays AND origin=:origin AND destination=:destination AND category=:category")
	public List<Bus> findBusByCategory(DayOfWeek day, String origin, String destination,String category);
	
	public Optional<Bus> findByBusNumber(long busNumber);
	
	public Optional<Bus> findByBusName(String busName);
	
	@Query(value="select distinct destination from bus where destination like :city%",nativeQuery = true)
	public List<String> autoSearchCityNameTo(String city);
	
	@Query(value="select distinct origin from bus where origin like :city%",nativeQuery = true)
	public List<String> autoSearchCityNameFrom(String city);
}
