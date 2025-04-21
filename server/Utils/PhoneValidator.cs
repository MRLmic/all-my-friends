using PhoneNumbers;

namespace Utils
{
    public static class PhoneValidator
    {
        public static bool IsValidPhoneNumber(string phoneNumber, string region)
        {
            var phoneNumberUtil = PhoneNumberUtil.GetInstance();
            try
            {
                var number = phoneNumberUtil.Parse(phoneNumber, region);
                return phoneNumberUtil.IsValidNumber(number);
            }
            catch (NumberParseException)
            {
                return false;
            }
        }

        public static string GetRegionCode(string phoneNumber)
        {
            var phoneNumberUtil = PhoneNumberUtil.GetInstance();
            try
            {
                var number = phoneNumberUtil.Parse(phoneNumber, null);
                return phoneNumberUtil.GetRegionCodeForNumber(number);
            }
            catch (NumberParseException)
            {
                return null;
            }
        }
    }
}
