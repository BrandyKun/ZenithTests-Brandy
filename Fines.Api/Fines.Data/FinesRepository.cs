using Fines.Core.Dtos;
using Fines.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Fines.Data;

public class FinesRepository : IFinesRepository
{
    private readonly FinesDbContext _context;

    public FinesRepository(FinesDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FinesEntity>> GetAllFinesAsync(FilterRequest filters)
    {
        IQueryable<FinesEntity> query = _context.Fines
            .Include(f => f.Vehicle)
            .Include(f => f.Customer);

        if (filters.FineDate is not null)
            query = query.Where(x => x.FineDate.Date == filters.FineDate.Value.Date);

        if (filters.FineType is not null)
            query = query.Where(x => x.FineType == filters.FineType);

        if (!string.IsNullOrWhiteSpace(filters.VehicleRegNo))
            query = query.Where(f => f.Vehicle.RegistrationNumber.ToLower() == filters.VehicleRegNo.ToLower());

        return await query.ToListAsync();
    }
}
