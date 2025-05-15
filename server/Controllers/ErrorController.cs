using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ErrorController: BaseApiController
{
    [HttpGet("notfound")]
    public ActionResult GetNotFound()
    {
        return NotFound();
    }
    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
        return BadRequest();
    }
    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
        return Unauthorized();
    }
    [HttpGet("validationerror")]
    public ActionResult GetValidationError()
    {
        ModelState.AddModelError("error_1", "An error 1 occurred");
        ModelState.AddModelError("error_2", "An error 2 occurred");
        return ValidationProblem();
    }
    [HttpGet("servererror")]
    public ActionResult GetServerError()
    {
        throw new Exception("Server error");
    }
}
