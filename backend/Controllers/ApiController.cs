using bayar_backend.Models;
using bayar_backend.Models.ContactRequest;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace bayar_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : Controller
    {
        private readonly string _connectionString;
        private readonly NpgsqlConnection _connection;

        public ApiController()
        {
            // Bağlantı bilgilerini başlat
            _connectionString = "Host=localhost;Port=5432;Username=postgres;Password=postgres;Database=bayar-tour";
            _connection = new NpgsqlConnection(_connectionString);
        }

        [HttpGet("tour/{id}")]
        public IActionResult GetTourById(int id)
        {
            try
            {
                _connection.Open();

                var selectSql = $"SELECT * FROM \"Tour\" WHERE id = @Id";
                using var selectCommand = new NpgsqlCommand(selectSql, _connection);
                selectCommand.Parameters.AddWithValue("Id", id);

                using var reader = selectCommand.ExecuteReader();

                if (reader.Read())
                {
                    var tour = new Tour
                    {
                        id = reader.GetInt64(reader.GetOrdinal("id")),
                        date = reader.GetDateTime(reader.GetOrdinal("date")),
                        name = reader.GetString(reader.GetOrdinal("name")),
                        price = reader.GetDecimal(reader.GetOrdinal("price")),
                        imageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                        description = reader.GetString(reader.GetOrdinal("description"))
                    };

                    return Ok(tour); // Veriyi başarıyla bulduysak 200 OK ile birlikte veriyi client'a gönder
                }
                else
                {
                    return NotFound(); // Belirtilen ID ile bir kayıt bulunamadıysa 404 Not Found döndür
                }
            }
            catch (Exception ex)
            {
                // Hata yönetimi burada yapılabilir
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error"); // Sunucu tarafında bir hata oluştuysa 500 Internal Server Error döndür
            }
            finally
            {
                // Bağlantıyı kapat
                _connection.Close();
            }
        }


        [HttpGet("tours")]
        public IActionResult GetAllTours()
        {
            try
            {
                _connection.Open();

                var selectSql = "SELECT * FROM \"Tour\"";
                using var selectCommand = new NpgsqlCommand(selectSql, _connection);
                using var reader = selectCommand.ExecuteReader();

                var tours = new List<Tour>(); // TourModel sınıfını, Tour tablosundan gelen her bir satırı temsil etmesi için oluşturmalısın

                while (reader.Read())
                {
                    var tour = new Tour
                    {
                        id = reader.GetInt64(reader.GetOrdinal("id")),
                        date = reader.GetDateTime(reader.GetOrdinal("date")),
                        name = reader.GetString(reader.GetOrdinal("name")),
                        price = reader.GetDecimal(reader.GetOrdinal("price")),
                        imageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                        description = reader.GetString(reader.GetOrdinal("description"))
                    };

                    tours.Add(tour);
                }

                return Ok(tours);
            }
            catch (Exception ex)
            {
                // Hata yönetimi burada yapılabilir
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
            finally
            {
                // Bağlantıyı kapat
                _connection.Close();
            }
        }

        [HttpGet("checkBudget")]
        public IActionResult CheckBudget(long userId, int tourId)
        {
            try
            {
                _connection.Open();

                // Kullanıcının bütçesini al
                var selectUserSql = "SELECT budget FROM \"Traveller\" WHERE id = @UserId";
                using var selectUserCommand = new NpgsqlCommand(selectUserSql, _connection);
                selectUserCommand.Parameters.AddWithValue("UserId", userId);

                var userBudgetObject = selectUserCommand.ExecuteScalar();

                // Eğer değer null değilse ve System.DBNull değilse dönüştür
                var userBudget = (userBudgetObject != DBNull.Value) ? Convert.ToDecimal(userBudgetObject) : 0m;


                // Turun fiyatını al
                var selectTourSql = $"SELECT price FROM \"Tour\" WHERE id = @TourId";
                using var selectTourCommand = new NpgsqlCommand(selectTourSql, _connection);
                selectTourCommand.Parameters.AddWithValue("TourId", tourId);

                var tourPrice = (decimal)selectTourCommand.ExecuteScalar();

                if (userBudget - tourPrice >= 0)
                {
                    // Kullanıcının bütçesini güncelle
                    var updateBudgetSql = "UPDATE \"Traveller\" SET budget = budget - @TourPrice WHERE id = @UserId";
                    using var updateBudgetCommand = new NpgsqlCommand(updateBudgetSql, _connection);
                    updateBudgetCommand.Parameters.AddWithValue("TourPrice", tourPrice);
                    updateBudgetCommand.Parameters.AddWithValue("UserId", userId);

                    updateBudgetCommand.ExecuteNonQuery();
                }
                Console.WriteLine(userBudget);
                Console.WriteLine(tourPrice);


                // Bütçe ve fiyat karşılaştırması yap
                var canAfford = userBudget >= tourPrice;

                return Ok(canAfford);
            }
            catch (Exception ex)
            {
                // Hata yönetimi burada yapılabilir
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
            finally
            {
                // Bağlantıyı kapat
                _connection.Close();
            }
        }

        [HttpPost("contact")]
        public bool Contact([FromBody] ContactRequest contactRequest)
        {
            try
            {
                _connection.Open();

                var insertSql = $"INSERT INTO \"Contact\" (email, name, message) VALUES (@Email, @Name, @Message)";
                using var insertCommand = new NpgsqlCommand(insertSql, _connection);
                insertCommand.Parameters.AddWithValue("Email", contactRequest.email);
                insertCommand.Parameters.AddWithValue("Name", contactRequest.name);
                insertCommand.Parameters.AddWithValue("Message", contactRequest.message);

                var rowsAffected = insertCommand.ExecuteNonQuery();

                return rowsAffected > 0; // Kayıt başarılıysa true, değilse false döndürür
            }
            catch (Exception ex)
            {
                // Hata yönetimi burada yapılabilir
                Console.WriteLine(ex.Message);
                return false;
            }
            finally
            {
                // Bağlantıyı kapat
                _connection.Close();
            }
        }

    }
}