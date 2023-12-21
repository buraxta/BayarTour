using Microsoft.AspNetCore.Mvc;
using bayar_backend.Models;
using Npgsql;
using bayar_backend.Models.Request; // Npgsql ekledik

namespace bayar_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TravellerController : Controller
    {

        private readonly string _connectionString;
        private readonly NpgsqlConnection _connection;

        public TravellerController()
        {
            // Bağlantı bilgilerini başlat
            _connectionString = "Host=localhost;Port=5432;Username=postgres;Password=postgres;Database=bayar-tour";
            _connection = new NpgsqlConnection(_connectionString);
        }

        [HttpGet("gettraveller")]
        public List<Traveller> GetTraveller()
        {

            _connection.Open();

            // SQL sorgusu oluştur
            var sql = "SELECT * FROM \"Traveller\"";
            var command = new NpgsqlCommand(sql, _connection); // NpgsqlCommand kullandık

            // Sorguyu çalıştır ve sonuçları bir liste olarak döndür
            var reader = command.ExecuteReader();
            var travellers = new List<Traveller>();
            while (reader.Read())
            {
                var traveller = new Traveller
                {
                    id = (long)reader["id"],
                    name = reader["name"].ToString(),
                    email = reader["email"].ToString(),
                    password = reader["password"].ToString()
                };

                travellers.Add(traveller);
            }

            // Bağlantıyı kapat
            _connection.Close();

            return travellers;
        }

        [HttpPost("login")]
        public bool Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                _connection.Open();

                // Veritabanında e-posta kontrolü
                var checkEmailSql = $"SELECT * FROM \"Traveller\" WHERE email = @Email";
                using var checkEmailCommand = new NpgsqlCommand(checkEmailSql, _connection);
                checkEmailCommand.Parameters.AddWithValue("Email", loginRequest.email);


                var emailReader = checkEmailCommand.ExecuteReader();

                if (!emailReader.Read())
                {
                    // E-posta bulunamadı
                    return false;
                }

                // Şifre kontrolü
                var storedPassword = emailReader["password"].ToString();

                if (loginRequest.password == storedPassword)
                {
                    // Şifre doğru
                    return true;
                }
                else
                {
                    // Şifre yanlış
                    return false;
                }
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

        [HttpPost("register")]
        public bool Register([FromBody] TravellerRegistrationRequest registrationRequest)
        {
            try
            {
                _connection.Open();

                // Veritabanında e-posta kontrolü
                var checkEmailSql = "SELECT COUNT(*) FROM \"Traveller\" WHERE email = @Email";
                using var checkEmailCommand = new NpgsqlCommand(checkEmailSql, _connection);
                checkEmailCommand.Parameters.AddWithValue("Email", registrationRequest.email);

                var existingEmailCount = Convert.ToInt32(checkEmailCommand.ExecuteScalar());

                if (existingEmailCount > 0)
                {
                    // E-posta zaten var, kayıt başarısız
                    return false;
                }

                // E-posta yok, kayıt yap
                var insertSql = "INSERT INTO \"Traveller\" (name, email, password) VALUES (@Name, @Email, @Password)";
                using var insertCommand = new NpgsqlCommand(insertSql, _connection);
                insertCommand.Parameters.AddWithValue("Name", registrationRequest.name);
                insertCommand.Parameters.AddWithValue("Email", registrationRequest.email);
                insertCommand.Parameters.AddWithValue("Password", registrationRequest.password);

                insertCommand.ExecuteNonQuery();

                // Kayıt başarılı
                return true;
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
