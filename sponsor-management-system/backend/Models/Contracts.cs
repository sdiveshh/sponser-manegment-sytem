namespace SponsorApplication.Models
{
    public class Contracts
    {
        public int ContractID { get; set; }
        public int SponsorID { get; set; }
        public int MatchID { get; set; }
        public System.DateTime ContractDate { get; set; }
        public decimal COntractValue { get; set; }
    }

    public class SponsorPaymentDetails
    {
        public int SponsorID { get; set; }
        public string? SponsorName { get; set; }
        public string? IndustryType { get; set; }
        public string? ContactEmail { get; set; }
        public string? Phone { get; set; }
        public decimal TotalPaymentsMade { get; set; }
        public int NumberOfPayments { get; set; }
        public DateTime LatestPaymentDate { get; set; }
    }
}