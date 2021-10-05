# SpaceDebris

más información en su repositorio, capturas, descripción, el uso de Azure, etc

SpaceDebris es la solución que la NASA está buscando para el registro de posiciones actuales y futuros de los satélites, entre ellos escombros, que orbitan 
en gran parte del espacio.

Ya que estos escombros espaciales no llevan un control no se dirigen a ningún lado y el choque con otros escombros podría provocar colisiones que afecten a 
satélites funcionales dejando graves fallas que a su vez afectan la actividad humana que se realiza en la Tierra, sin embargo, con algunos parámetros espaciales
es posible predecir el rumbo que llevarán.

Esto no fuera posible sin herramientas tecnológicas como Pyhton y alguna de sus librerías (SGP4, Astropy, numpy), como Javascript y algunas de sus librerías (SatelliteJS) y herramientas open-source como Web WorldWind de la NASA para globos terraqueos virtuales en páginas web.

## NORAD Two-Line Element Set Format

Los parámetros para cada satélite consisten de tres líneas en el siguiente formato:

    AAAAAAAAAAAAAAAAAAAAAAAA
    1 NNNNNU NNNNNAAA NNNNN.NNNNNNNN +.NNNNNNNN +NNNNN-N +NNNNN-N N NNNNN
    2 NNNNN NNN.NNNN NNN.NNNN NNNNNNN NNN.NNNN NNN.NNNN NN.NNNNNNNNNNNNNN

La línea 0 es un nombre de veinticuatro caracteres (para ser coherente con la longitud del nombre en el NORAD SATCAT).

Las líneas 1 y 2 son el formato de conjunto de elementos orbitales de dos líneas estándar idéntico al utilizado por NORAD y NASA.

## [SGP4](https://pypi.org/project/sgp4/)

![Captura de Pantalla 2021-10-05 a la(s) 0 51 11](https://user-images.githubusercontent.com/68259360/135967768-21c4c199-95b4-43e6-8eaf-674308157625.png)

Este paquete de Python calcula la posición y la velocidad de un satélite en órbita terrestre, dados los elementos orbitales TLE del satélite de una fuente como CelesTrak.

```
from sgp4.api import Satrec

s = '1 25544U 98067A   19343.69339541  .00001764  00000-0  38792-4 0  9991'
t = '2 25544  51.6439 211.2001 0007417  17.6667  85.6398 15.50103472202482'
satellite = Satrec.twoline2rv(s, t)

jd, fr = 2458827, 0.362605
e, r, v = satellite.sgp4(jd, fr)
```
Con el código anterior obtenemos:

`r` mide la posición del satélite en kilómetros desde el centro de la Tierra en el marco de coordenadas idiosincrásico del Equinoccio Medio del Ecuador Verdadero utilizado por SGP4.

`v` La velocidad es la velocidad a la que cambia la posición, expresada en kilómetros por segundo.


## [astropy](https://docs.astropy.org/en/stable/index.html)

![Captura de Pantalla 2021-10-05 a la(s) 0 55 00](https://user-images.githubusercontent.com/68259360/135968180-757b1466-1e55-46f7-8ab2-b76063c185ee.png)

Astropy es una colección de paquetes de software escritos en el lenguaje de programación Python y diseñados para su uso en astronomía.

Una vez que ya obtenemos los parámetros r y v con SGP4, los utilizaremos en astropy de la siguiente manera:

 ```
 from astropy.coordinates import TEME, CartesianDifferential, CartesianRepresentation
 from astropy import units as u
 teme_p = CartesianRepresentation(r*u.km)
 teme_v = CartesianDifferential(v*u.km/u.s)
 teme = TEME(teme_p.with_differentials(teme_v), obstime=t)
 ```
Obteniendo la posición en [TEME](https://docs.astropy.org/en/stable/api/astropy.coordinates.TEME.html#astropy.coordinates.TEME).

Aquí convertiremos el formato TEME en coordenadas polares.

```
from astropy.coordinates import ITRS
itrs = teme.transform_to(ITRS(obstime=t))  
location = itrs.earth_location
location.geodetic
``` 

## [NASA api Web WorldWind](https://worldwind.arc.nasa.gov/web/docs/#anchor)

![Captura de Pantalla 2021-10-05 a la(s) 0 57 35](https://user-images.githubusercontent.com/68259360/135968419-98f4c289-fea0-4a20-9759-ab46a2e540f9.png)

Un archivo de Javascript con el siguiente código:

```
wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
```

Resulta en lo siguiente plasmado en nuestra página web:

![Captura de Pantalla 2021-10-05 a la(s) 1 23 17](https://user-images.githubusercontent.com/68259360/135971085-fc1008f6-79d9-4165-989d-5317b6bcff93.png)

# Deploy de proyecto en Django vía extensión Visual Studio Code

1. Descargamos de la extensión

![Captura de Pantalla 2021-10-05 a la(s) 1 53 53](https://user-images.githubusercontent.com/68259360/135974516-2726e522-1b7e-429c-809b-d627e722903c.png)

2. Creamos un grupo de recursos en la suscripción que tenemos por defecto

![Captura de Pantalla 2021-10-05 a la(s) 1 57 32](https://user-images.githubusercontent.com/68259360/135975064-fd03f461-1a75-47c4-a83f-2fc5ae99a389.png)

3. Creamos una App Service en nuestra suscripción por defecto

![Captura de Pantalla 2021-10-05 a la(s) 1 59 33](https://user-images.githubusercontent.com/68259360/135975307-624f43ac-1c38-4f55-b822-677d77817010.png)

* Y si observamos en nuestro Portal

![Captura de Pantalla 2021-10-05 a la(s) 2 03 37](https://user-images.githubusercontent.com/68259360/135975749-8592d874-d6c4-4812-864b-fc9bc7d25e27.png)

4. Una vez completado, añadimos la siguiente configuración

![Captura de Pantalla 2021-10-05 a la(s) 2 02 13](https://user-images.githubusercontent.com/68259360/135975818-fb477ee1-02b6-495f-ba2c-3da0c0c79c6c.png)

* Se desplegará una paleta de comandos, donde escribiremos 'SCM_DO_BUILD_DURING_DEPLOYMENT'

![Captura de Pantalla 2021-10-05 a la(s) 2 05 44](https://user-images.githubusercontent.com/68259360/135976053-9a346a16-db40-450f-bbb8-9da848848e43.png)

* Y posteriormente el valor de '1'.

5. Añadir las siguientes líneas de configuración en el archivo `settings.py` del proyecto.

![Captura de Pantalla 2021-10-05 a la(s) 2 08 59](https://user-images.githubusercontent.com/68259360/135976458-842bebb3-1d15-4266-8538-6f6a82a74072.png)

![Captura de Pantalla 2021-10-05 a la(s) 2 09 18](https://user-images.githubusercontent.com/68259360/135976460-745eb3ce-86c7-4803-9115-4be5a7712e8e.png)

6. Seleccionamos el siguiente botón para hacer el deploy de nuestra aplicación

![Captura de Pantalla 2021-10-05 a la(s) 2 11 10](https://user-images.githubusercontent.com/68259360/135976789-75915ed2-55d4-4e0f-a907-6ea221ec5443.png)

* Y en el comando de paletas seleccionamos nuestra aplicación

7. Esperamos miestras se realiza el deploy

![Captura de Pantalla 2021-10-05 a la(s) 2 13 01](https://user-images.githubusercontent.com/68259360/135977070-0f82bf22-acc9-4716-b073-75a1407b8b2b.png)

# ¡Listo!

La consola nos ha indicado que se ha hecho un deploy con éxito

![Captura de Pantalla 2021-10-05 a la(s) 2 18 48](https://user-images.githubusercontent.com/68259360/135977751-a3d6ad85-6c62-4881-87ed-e37513a235f0.png)

Damos click en "Browse Website"

![Captura de Pantalla 2021-10-05 a la(s) 2 18 26](https://user-images.githubusercontent.com/68259360/135977841-778ce014-e518-4e26-895c-937f83297252.png)

[Sitio web](https://user-images.githubusercontent.com/68259360/135978598-99b058bc-5110-4a03-aabd-f24a557afd9b.mov)
