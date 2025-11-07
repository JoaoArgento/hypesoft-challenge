using Application.DTOs;

public class DashboardSummaryDTO
{
    public int TotalProducts { get; set; }
    public decimal TotalStockValue { get; set; }
    public IEnumerable<ProductDTO> LowStockProducts { get; set; }
    public IEnumerable<ProductDTO> ProductsByCategory { get; set; }


}