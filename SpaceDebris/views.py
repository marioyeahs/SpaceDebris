from django.shortcuts import render
from sgp4.api import Satrec, SGP4_ERRORS 
from astropy.coordinates import TEME, CartesianDifferential, CartesianRepresentation, ITRS
from astropy import units as u
from astropy.time import Time

def index(request):    
    with open('SpaceDebris/active.txt') as f:
        lines = [line.rstrip() for line in f]
    names=[]
    for i in range(0, len(lines),3):
        names.append(lines[i])
    names=sorted(names)
    return render(request,"SpaceDebris/index.html",{
        'names':names
        })

def info(request,satellite):
    with open('SpaceDebris/active.txt') as f:
        lines = [line.rstrip() for line in f]
    index=lines.index(satellite)
    sat=lines[index]
    s=lines[index+1]
    t=lines[index+2]
    satellite = Satrec.twoline2rv(s,t)
    jd, fr = 2458827, 0.362605
    e, r, v = satellite.sgp4(jd, fr)
    if e != 0:
        raise RuntimeError(SGP4_ERRORS[e])
    teme_p = CartesianRepresentation(r*u.km)
    teme_v = CartesianDifferential(v*u.km/u.s)
    time = Time(jd, format='jd')
    teme = TEME(teme_p.with_differentials(teme_v), obstime=time)
    itrs = teme.transform_to(ITRS(obstime=time))  
    location = itrs.earth_location
    lon = location.geodetic[0].degree
    lat = location.geodetic[1].degree
    km = location.geodetic[2]
    return render(request,"SpaceDebris/info.html",{
        'sat':sat,
        's':s,
        't':t,
        'lon':lon,
        'lat': lat,
        'km': km,
    })