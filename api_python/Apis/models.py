# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Tutorial(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    published = models.BooleanField(default=False)
class Admins(models.Model):
    address = models.CharField(max_length=45, blank=True, null=True)
    incorporation = models.CharField(max_length=45, blank=True, null=True)
    phone = models.CharField(max_length=45, blank=True, null=True)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'admins'


class ApisTutorial(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=200)
    published = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'apis_tutorial'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Auxs(models.Model):
    type = models.CharField(max_length=45)
    name = models.CharField(max_length=45, blank=True, null=True)
    cik = models.CharField(max_length=45, blank=True, null=True)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'auxs'


class Auxtypes(models.Model):
    type = models.CharField(primary_key=True, max_length=45)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'auxtypes'


class Dates(models.Model):
    type = models.ForeignKey('Datetypes', models.DO_NOTHING, db_column='type')
    date = models.DateTimeField()
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'dates'


class Datetypes(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'datetypes'


class Directors(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True)
    position = models.CharField(max_length=150, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=255)
    cik = models.CharField(max_length=150)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'directors'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Filings(models.Model):
    date = models.DateTimeField(blank=True, null=True)
    type = models.CharField(max_length=150, blank=True, null=True)
    link = models.CharField(max_length=150, blank=True, null=True)
    title = models.CharField(max_length=150, blank=True, null=True)
    description = models.CharField(max_length=150, blank=True, null=True)
    image_link = models.CharField(max_length=150, blank=True, null=True)
    ref = models.CharField(max_length=150, blank=True, null=True)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'filings'


class Follows(models.Model):
    spac_id = models.IntegerField()
    user = models.ForeignKey('Users', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'follows'


class Industries(models.Model):
    name = models.CharField(max_length=45)
    sic_number = models.CharField(max_length=45)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'industries'


class Markets(models.Model):
    type = models.CharField(max_length=45)
    date = models.DateTimeField(blank=True, null=True)
    price = models.CharField(max_length=255, blank=True, null=True)
    volume = models.CharField(max_length=255, blank=True, null=True)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'markets'


class Markettypes(models.Model):
    type_id = models.IntegerField()
    type = models.CharField(max_length=255)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'markettypes'


class News(models.Model):
    date = models.DateTimeField()
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    id_types = models.IntegerField()
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'news'


class Newstypes(models.Model):
    category = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    reg_date = models.DateTimeField()
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'newstypes'


class Overviews(models.Model):
    market_cap = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    id_industries = models.ForeignKey(Industries, models.DO_NOTHING, db_column='id_industries')
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'overviews'


class S4Data(models.Model):
    mcc = models.FloatField(blank=True, null=True)
    pipe = models.FloatField(blank=True, null=True)
    fpa = models.FloatField(blank=True, null=True)
    backstop = models.FloatField(blank=True, null=True)
    max_redshares = models.FloatField(blank=True, null=True)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 's4_data'


class Shareholders(models.Model):
    fund_name = models.CharField(max_length=150, blank=True, null=True)
    shares = models.IntegerField(blank=True, null=True)
    percentage = models.FloatField(blank=True, null=True)
    spac = models.ForeignKey('Spacs', models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'shareholders'


class Spacs(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True)
    cik = models.CharField(max_length=45)
    id_sponsor = models.IntegerField(blank=True, null=True)
    is_hot_list = models.IntegerField(blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    spac = models.ForeignKey(Follows, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spacs'


class Sponsors(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)
    cik = models.CharField(max_length=45, blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'sponsors'


class Targets(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True)
    cik = models.CharField(max_length=45, blank=True, null=True)
    spac = models.ForeignKey(Spacs, models.DO_NOTHING, blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'targets'


class Tickers(models.Model):
    unit_ticker = models.CharField(max_length=45, blank=True, null=True)
    common_stock_ticker = models.CharField(max_length=45, blank=True, null=True)
    warrant_ticker = models.CharField(max_length=45, blank=True, null=True)
    target_stock = models.CharField(max_length=45, blank=True, null=True)
    target_warrant = models.CharField(max_length=45, blank=True, null=True)
    spac = models.ForeignKey(Spacs, models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tickers'


class Trusts(models.Model):
    ipo_price = models.FloatField(blank=True, null=True)
    ipo_issuance = models.IntegerField(blank=True, null=True)
    extendable = models.CharField(max_length=255, blank=True, null=True)
    units_over_warrents = models.IntegerField(blank=True, null=True)
    recent_cash = models.FloatField(blank=True, null=True)
    recent_shares = models.IntegerField(blank=True, null=True)
    spac = models.ForeignKey(Spacs, models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'trusts'


class Uploads(models.Model):
    news = models.ForeignKey(News, models.DO_NOTHING)
    file = models.CharField(max_length=255)
    type = models.IntegerField()
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'uploads'


class Users(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    type_id = models.IntegerField()
    authorized = models.IntegerField()
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'users'


class WarrantInfos(models.Model):
    strike = models.FloatField(blank=True, null=True)
    multiplier = models.FloatField(blank=True, null=True)
    first_exercise = models.DateTimeField(blank=True, null=True)
    expiration = models.DateTimeField(blank=True, null=True)
    delta = models.FloatField(blank=True, null=True)
    vol = models.FloatField(blank=True, null=True)
    spac = models.ForeignKey(Spacs, models.DO_NOTHING)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'warrant_infos'
