namespace backend.BLL.DTO;

public class AddressDTO
{
    public long Id { get; set; }

    public string Country { get; set; }

    public string City { get; set; }

    public string Street { get; set; }

    public string PostalCode { get; set; }

    public int HouseNumber { get; set; }

    public bool IsDefault { get; set; }

    public long UserId { get; set; }
}

public class AddressInfoDTO
{
    public string Street { get; set; }
    public int HouseNumber { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }
}

public class UpdateAddressInfoDTO
{
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string phone { get; set; }
    public string street { get; set; }
    public string houseNumber { get; set; }
    public string state { get; set; }
    public string city { get; set; }
    public string country { get; set; }
    public string postalCode { get; set; }
}