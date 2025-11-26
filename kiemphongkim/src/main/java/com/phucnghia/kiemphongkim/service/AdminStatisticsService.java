package com.phucnghia.kiemphongkim.service;

import java.util.Map;

public interface AdminStatisticsService {

    Map<String, Object> getOverview();  // tổng doanh thu, tổng đơn, tổng user, v.v.

    Map<String, Object> getRevenueByMonth(int year);

    Map<String, Object> getTopProducts(int limit);

    Map<String, Object> getOrderStatusSummary();
}
