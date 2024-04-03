using FluentValidation;
using TestVox.Server.Data;

namespace TestVox.Server.Validator
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordValidator()
        {
            RuleFor(request => request.oldPassword).NotNull().NotEmpty();
            RuleFor(request => request.newPassword).NotNull().NotEmpty();
            RuleFor(request => request.repeatPassword).NotNull().NotEmpty().Equal(request => request.newPassword);
        }
    }
}
