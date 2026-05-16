using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;
using SponsorApplication.DAO;
using SponsorApplication.Models;
using System.Threading.Tasks.Dataflow;

namespace SponsorApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : ControllerBase
    {
        private readonly ISponsorDao _sponsorDao;
        public SponsorController(ISponsorDao sponsorDao)
        {
            _sponsorDao = sponsorDao;
        }


        [HttpPost("Add-Payments")]
        public async Task<IActionResult> AddPayment(Payments payment)
        {
            if (payment == null || payment.PaymentDate == null || payment.AmountPaid == 0)
            {
                return BadRequest("Invalid payment data.");
            }
            bool isAdded = await _sponsorDao.AddPayment(payment);
            if (isAdded)
            {
                return Ok("Payment added successfully.");
            }
            else
            {
                return StatusCode(500, "An error occurred while adding the payment.");
            }
        }

        [HttpGet("Sponsor-Details")]
        public async Task<IActionResult> GetSponsorDetails()
        {
            var sponsorDetails = await _sponsorDao.GetSponsorDetailsAsync();
            return Ok(sponsorDetails);
        }

        [HttpGet("Match-Details")]
        public async Task<IActionResult> GetMatchDetails()
        {
            var matchDetails = await _sponsorDao.GetMatchDetailsAsync();
            return Ok(matchDetails);
        }

        [HttpGet("sponsors-matches")]
        public async Task<ActionResult<IEnumerable<SponsorMatches>>> GetSponsorsMatches([FromQuery] int year)
        {
            var result = await _sponsorDao.GetSponsorsMatchesAsync(year);
            return Ok(result);
        }
    }
}
