using Fines.Core.Enums;

namespace Fines.Core.Dtos;

public class FilterRequest
{
    public DateTime? FineDate{ get; set; }
    public FineType? FineType { get; set; } 
    public string? VehicleRegNo { get; set; } = string.Empty;
}
