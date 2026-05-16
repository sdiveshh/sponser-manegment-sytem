using Microsoft.AspNetCore.Http.HttpResults;
using System.Diagnostics.Contracts;
using System.Data;
using Npgsql;
using NpgsqlTypes;
using SponsorApplication.Models;

namespace SponsorApplication.DAO
{
    public class SponsorDaoImpl : ISponsorDao
    {
        NpgsqlConnection _connection;
        public SponsorDaoImpl(NpgsqlConnection connection)
        {
            _connection = connection;
        }
        public async Task<bool> AddPayment(Payments payment)
        {
            string sql = "INSERT INTO Payments (ContractID, PaymentDate, AmountPaid, PaymentStatus) VALUES (@ContractID, @PaymentDate, @AmountPaid, @PaymentStatus)";
            using var cmd = new NpgsqlCommand(sql, _connection);
            cmd.Parameters.AddWithValue("ContractID", payment.ContractID);
            cmd.Parameters.AddWithValue("PaymentDate", payment.PaymentDate);
            cmd.Parameters.AddWithValue("AmountPaid", payment.AmountPaid);
            cmd.Parameters.AddWithValue("PaymentStatus", payment.PaymentStatus);

            if (_connection.State != ConnectionState.Open)
            {
                await _connection.OpenAsync();
            }

            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> IsPaymentDataValid(Payments payment)
        {
            string sql = "SELECT COUNT(*) FROM Payments WHERE PaymentDate = @PaymentDate AND AmountPaid = @AmountPaid";
            using var cmd = new NpgsqlCommand(sql, _connection);
            cmd.Parameters.AddWithValue("PaymentDate", payment.PaymentDate);
            cmd.Parameters.AddWithValue("AmountPaid", payment.AmountPaid);

            var count = (long)await cmd.ExecuteScalarAsync();
            return count > 0;
        }



        public async Task<IEnumerable<SponsorDetails>> GetSponsorDetailsAsync()
        {
            string sql = @" select s.sponsorID, s.sponsorName, 
               COALESCE(SUM(p.amountPaid), 0) AS totalPayments, 
               COUNT(p.paymentID) AS numberOfPayments, 
               COALESCE(MAX(p.paymentDate), '1900-01-01') AS latestPaymentDate
               from sponsors s
               left join contracts c ON s.sponsorID = c.sponsorID
               left join payments p ON c.contractID = p.contractID
               group by s.sponsorID, s.sponsorName";

            using var cmd = new NpgsqlCommand(sql, _connection);
            if (_connection.State != ConnectionState.Open)
            {
                await _connection.OpenAsync();
            }

            using var reader = await cmd.ExecuteReaderAsync();
            var sponsorDetails = new List<SponsorDetails>();
            while (await reader.ReadAsync())
            {
                sponsorDetails.Add(new SponsorDetails
                {
                    SponsorId = reader.GetInt32(0),
                    SponsorName = reader.GetString(1),
                    TotalPayments = reader.GetDecimal(2),
                    NumberOfPayments = reader.GetInt32(3),
                    LatestPaymentDate = reader.GetDateTime(4)
                });
            }
            return sponsorDetails;
        }





        public async Task<IEnumerable<MatchDetails>> GetMatchDetailsAsync()
        {
            string sql = @" select m.matchID, m.matchDate, m.location, COALESCE(SUM(p.amountPaid), 0) as totalPayments,
                            COUNT(p.paymentID) as numberOfPayments,
                            COALESCE(MAX(p.paymentDate), '1900-01-01') as latestPaymentDate,
                            COUNT(DISTINCT c.sponsorID) as numberOfSponsors
                            from matches m
                            left join contracts c ON m.matchID = c.matchID
                            left join payments p ON c.contractID = p.contractID
                            group by  m.matchID, m.matchDate, m.location";

            using var cmd = new NpgsqlCommand(sql, _connection);
            if (_connection.State != ConnectionState.Open)
            {
                await _connection.OpenAsync();
            }

            using var reader = await cmd.ExecuteReaderAsync();
            var matchDetails = new List<MatchDetails>();
            while (await reader.ReadAsync())
            {
                matchDetails.Add(new MatchDetails
                {
                    MatchId = reader.GetInt32(0),
                    MatchDate = reader.GetDateTime(1),
                    Location = reader.GetString(2),
                    TotalPayments = reader.GetDecimal(3)
                });
            }
            return matchDetails;
        }

        public async Task<IEnumerable<SponsorMatches>> GetSponsorsMatchesAsync(int year) {
            string sql = @"
                select s.sponsorid, s.sponsorname, count(DISTINCT c.matchid) as numberOfMatches 
                from sponsors s 
                join contracts c ON s.sponsorid = c.sponsorid 
                join payments p ON c.contractid = p.contractid 
                join matches m ON c.matchid = m.matchid
                where EXTRACT(YEAR FROM m.matchdate) = @year 
                and p.paymentstatus = 'Completed' 
                group by s.sponsorid, s.sponsorname";

            using var cmd = new NpgsqlCommand(sql, _connection);
            cmd.Parameters.AddWithValue("year", year);

            if (_connection.State != ConnectionState.Open) {
                await _connection.OpenAsync();
            }

            using var reader = await cmd.ExecuteReaderAsync();
            var sponsorMatches = new List<SponsorMatches>();
            while (await reader.ReadAsync()) {
                sponsorMatches.Add(new SponsorMatches
                {
                    SponsorId = reader.GetInt32(0),
                    SponsorName = reader.GetString(1),
                    NumberOfMatches = reader.GetInt32(2)
                });
            }
            return sponsorMatches;
        }
    }
}
