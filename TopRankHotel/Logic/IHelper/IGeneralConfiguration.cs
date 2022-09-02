using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.IHelper
{
    public interface IGeneralConfiguration
    {
        string CodeUrl { get; set; }

        string Token { get; set; }

        string PayStakApiKey { get; set; }

        decimal DollarRate { get; set; }

        string AdminEmail { get; set; }

        string DeveloperEmail { get; set; }

        string CoinBaseUrl { get; set; }
        string CoinBaseSecreteKey { get; set; }
        string CoinBaseApiKey { get; set; }
    }
}
