import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiTags('Appointments')
  @Get('')
  @ApiOperation({
    summary: 'Muestra todos los turnos',
    description: 'Esta ruta muestra todos los turnos de todas las mascotas',
  })
  getAppoinment() {
    return this.appointmentService.getAppointmentsService();
  }

  @Get('/:idAppoinment')
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
  getAppoinmentById(@Param('idAppointment') idAppointment: string) {
    return this.appointmentService.getAppointmentByIdService(idAppointment);
  }

  @Get('/user:idUser')
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
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, idPet: string) {
    return this.appointmentService.createAppointmentService(createAppointmentDto, idPet);
  }

  @Put('edit/:idPet')
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
  editAppointment(@Param('idPet') idPet: string, @Body() editAppointmentDto: EditAppointmentDto) {
    return this.appointmentService.editAppointmentService(editAppointmentDto, idPet);
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
