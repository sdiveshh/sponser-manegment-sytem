using System.Threading.Tasks;
using SponsorApplication.Models;


namespace SponsorApplication.DAO
{
    public interface ISponsorDao
    {
        public Task<bool> AddPayment(Payments payment);
        public Task<bool> IsPaymentDataValid(Payments payment);
        public Task<IEnumerable<SponsorMatches>> GetSponsorsMatchesAsync(int year);
        public Task<IEnumerable<MatchDetails>> GetMatchDetailsAsync();
        public Task<IEnumerable<SponsorDetails>> GetSponsorDetailsAsync();

    }
}

























/*

in the Models folder I have created 4 files named as Contracts.cs, Matches.cs, Payment.cs, Sponsor.cs
there code is async followed below:-

    public class Contracts
{
    public int ContractID { get; set; }
    public int SponsorID { get; set; }
    public int MatchID { get; set; }
    public System.DateTime ContractDate { get; set; }
    public decimal COntractValue { get; set; }
}

public class Matches
{
    public int MatchID { get; set; }
    public string MatchName { get; set; }
    public System.DateTime MatchDate { get; set; }
    public string Location { get; set; }
}


public class Sponsor
{
    public int SponsorID { get; set; }
    public string SponsorName { get; set; }
    public string IndustryType { get; set; }
    public string ContactEmail { get; set; }
    public string Phone { get; set; }
}

public class Payments
{
    public int PaymentID { get; set; }
    public int ContractID { get; set; }
    public System.DateTime PaymentDate { get; set; }
    public decimal AmountPaid { get; set; }
    public string PaymentStatus { get; set; }
}

*/

