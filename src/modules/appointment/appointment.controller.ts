import { Controller, Post, Body, Param, Put, Get, Query, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppResponseCalendarDayDto } from './dto/AppResponseCalendar.dto';
import { Appointment } from './entities/appointment.entity';
import { IdAndDateDto} from './dto/idAndDate.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  @ApiOperation({
    summary: 'Muestra todos los turnos',
    description: 'Esta ruta muestra todos los turnos de todas las mascotas',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  getAppoinment(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.appointmentService.getAppointmentsService(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Muestra un turno por ID',
    description: 'Esta ruta muestra un turno de mascota',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al buscar el turno',
  })
  @ApiBadRequestResponse({
    description: 'No se encontro el turno',
  })
  getAppoinmentById(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentService.getAppointmentByIdService(id);
  }

  @Post("AppointmentsByVeterinarianAndDate")
  async getAppointmentsByVeterinarianAndDate (@Body() vetDate:IdAndDateDto): Promise<AppResponseCalendarDayDto[]> {
         return await this.appointmentService.getAppointmentsByIdAndDate(vetDate.id, vetDate.date, false)
  }

  @Post("AppointmentsByAdminAndDate")
  async getAppointmentsByAdminAndDate (@Body() adminDate:IdAndDateDto): Promise<AppResponseCalendarDayDto[]> {
         return await this.appointmentService.getAppointmentsByIdAndDate(adminDate.id, adminDate.date, true)
  }

  @Get('/user/:idUser')
  @ApiOperation({
    summary: 'Muestra turnos creados por el usuario',
    description: 'Esta ruta muestra turnos creados por el usuario',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al buscar turnos',
  })
  @ApiBadRequestResponse({
    description: 'No se encontro el ID del usuario',
  })
  getAppoinmentsByUserId(@Param('idUser') idUser: string) {
    return this.appointmentService.getAppointmentsByUserIdService(idUser);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Crear turno',
    description: 'Esta ruta crea un nuevo turno para la mascota...',
  })
  @ApiBody({
    description: 'Ingrese los datos requeridos para el turno',
    type: CreateAppointmentDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar crear el turno',
  })
  @ApiBadRequestResponse({
    description: 'Faltan datos para la creacion del turno',
  })
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointmentService(createAppointmentDto);
  }

  @Put('edit/:idAppointment')
  @ApiOperation({
    summary: 'Edita turno',
    description: 'Esta ruta edita un turno de la mascota...',
  })
  @ApiBody({
    description: 'Ingrese los datos para editar el turno',
    type: EditAppointmentDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar editar el turno',
  })
  @ApiBadRequestResponse({
    description: 'algunos datos son incorrectos',
  })
  editAppointment(@Param('idAppointment') idAppointment: string, @Body() editAppointmentDto: EditAppointmentDto) {
    return this.appointmentService.editAppointmentService(editAppointmentDto, idAppointment);
  }
  @Put('finish/:idAppointment')
  @ApiOperation({
    summary: 'Finaliza turno',
    description: 'Esta ruta finaliza un turno de la mascota...',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar finalizar el turno',
  })
  @ApiBadRequestResponse({
    description: 'ID incorrecto o ya finalizado',
  })
  finishAppointment(@Param('idAppointment') idAppointment: string) {
    return this.appointmentService.finishAppointmentService(idAppointment);
  }
  @Put('cancel/:idAppointment')
  @ApiOperation({
    summary: 'Cancela turno',
    description: 'Esta ruta cancela el turno de la mascota...',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar cancelar el turno',
  })
  @ApiBadRequestResponse({
    description: 'id del turno no se encuentra o es incorrecto',
  })
  cancelAppointment(@Param('idAppointment') idAppointment: string) {
    return this.appointmentService.cancelAppointmentService(idAppointment);
  }
}
